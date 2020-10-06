const bent = require('bent');
const assert = require('assert');
const noopLogger = {
  info: console.log,
  error: console.error
};


const addLeadingPlus = (str) => (str.startsWith('+') ? str : `+${str}`);

const toBase64 = (str) => Buffer.from(str || '', 'utf8').toString('base64');

const fromProviderFormat = (opts, payload) => {
  const obj = Object.assign({}, opts, {
    from: payload.data.originator,
    to: [payload.data.destination],
    text: payload.data.message
  });
  return obj;
};

const basicAuth = (username, password) => {
  if (!username || !password) return {};
  const creds = `${username}:${password || ''}`;
  const header = `Basic ${toBase64(creds)}`;
  return {Authorization: header};
};

const sendSms = async(opts, body) => {
  const logger = opts.logger || noopLogger;
  const headers = opts.auth ? basicAuth(opts.auth.username, opts.auth.password) : {};
  assert.ok(typeof opts.url === 'string', 'sendSms: opts.url must be provided');
  const post = bent('POST', 'json', 200, headers);
  try {
    const buf = await post(opts.url, {
      from: body.from,
      to: body.to,
      cc: [],
      message: body.text,
      media: []
    });
    return buf;
  } catch (err) {
    logger.error({err, url: opts.url}, 'Error sending SMS to peerless');
  }
};

module.exports = {
  fromProviderFormat,
  sendSms
};
