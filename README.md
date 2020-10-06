# messaging-simwood  [![Build Status](https://secure.travis-ci.org/jambonz/messaging-simwood.png)](http://travis-ci.org/jambonz/messaging-simwood)

Helper functions for parsing incoming SMS/MMS messages from Simwood into a standard format for application processing.

## Functions

### fromProviderFormat({messageSid, applicationSid, accountSid}, url, payload)
translates an incoming SMS from Simwood into a standard format for application processing.

Simwood format looks like this:
```
{
		"app": "sms_inbound",
		"id": "9a171a847f32e9b8b1b0e43b33120d2a",
		"data": {
			"destination": "15085710838",
			"length": 8,
			"message": "Hi there",
			"originator": "15083084809",
			"time": "2020-10-06 20:36:05"
		}
	}
	```

standard format is:
```
{
	"messageSid": "7c626e1b-7796-4f77-9848-056900b071c4",
	"applicationSid": "9fd9866f-d4bc-46e2-91f1-43da922d80ce",
	"accountSid": "505faa3d-e1cb-4855-8346-f57fb5611b7d",
	"from": "15083084809",
	"to": ["15085710838"],
	"text": "Hi there!",
	"cc": [],
	"media": []
}
```

### formatProviderResponse(messageSid)
This function will be called before sending a response to Simwood for an incoming SMS. Simwood requires a 200 OK with a JSON body in response to incoming SMS, e.g.

```
{"receipt": "7c626e1b-7796-4f77-9848-056900b071c4"}
```

### sendSms(opts, payload)
send an outgoing SMS message from a payload that is presented in standard application format.

The `opts` parameter may include properties that are needed to construct the proper URL, perform HTTP basic authentication, etc.



