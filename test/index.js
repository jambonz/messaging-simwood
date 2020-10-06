const test = require('tape').test ;
const {fromProviderFormat, formatProviderResponse, sendSms} = require('..');

test('parse incoming sms', async(t) => {

  try {
    let payload = {
      "app": "sms_inbound",
      "id": "9a171a847f32e9b8b1b0e43b33120d2a",
      "data": {
        "destination": "15085710838",
        "length": 8,
        "message": "Hi there",
        "originator": "15083084809",
        "time": "2020-10-06 20:36:05"
      }
    };
    let obj = await fromProviderFormat({
      messageSid: 'foo',
      applicationSid: 'bar',
      accountSid: 'baz'
    }, payload);
    t.ok(payload.data.originator === obj.from, 'successfully filtered SMS payload');
    
    if (process.env.USER && process.env.PASSWORD && process.env.ACCOUNT) {
      const res = await sendSms({
        url: `https://api.simwood.com/v3/messaging/${process.env.ACCOUNT}/sms`,
        auth: {
          username: process.env.USER,
          password: process.env.PASSWORD
        }}, {
          to: '15083084809',
          from: '15085710838',
          text: 'hi there'
        });
      console.log(res);  
    }

    t.end();
  }
  catch (err) {
    console.error(err);
    t.end(err);
  }
});

