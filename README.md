# Actions On Google API.AI fulfillment server on AWS lambda

Example that shows you how to run a Google Home skill fulfillment on an AWS lambda (Blasphemy!)

## The problem
Wouldn't it be nice if Google's Google Assistant SDK for NodeJS decoupled the request handling from 
Express so you can use the assistant SDK in a simple AWS lambda microservice? 
I wonder why is Google not rushing to implement it (rhetorical question)...
Well, my friend! You came to the right place. With the help of the
[express-mocks-http](https://www.npmjs.com/package/express-mocks-http)
module you can fool the SDK into believing it is handling an Express call. 


## Tools you need

- node tools (npm)
- https://bespoken.io (bst)

## Installation

Clone the repo:

```bash
$ git clone https://github.com/OpenDog/actions-on-aws.git
```

Initial setup:

```bash
$ npm install
```
## Run a lambda test with the bespoken bst proxy

```bash
$ bst proxy lambda index.js
```

### Now you can use the url bst gives you as the fulfillment url in your API.AI setup...

### ... or if you are impatient you can throw a launch request at the url with curl

```bash
$ curl -X POST \
  https://<bst-id>.bespoken.link/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"originalRequest": {
		"source": "google",
		"data": {
			"surface": {
				"capabilities": []
			},
			"inputs": [{
				"arguments": [{
					"text_value": "1",
					"name": "is_health_check"
				}],
				"intent": "assistant.intent.action.MAIN",
				"raw_inputs": [{
					"query": "talk to google on amazon",
					"annotation_sets": []
				}]
			}],
			"user": {
				"user_id": "1491343035545"
			},
			"conversation": {
				"conversation_id": "1491343035545",
				"type": 1
			}
		}
	},
	"id": "e768f22a-bc23-4353-8f8e-886508caae7a",
	"timestamp": "2017-04-04T21:57:15.706Z",
	"lang": "en",
	"result": {
		"source": "agent",
		"resolvedQuery": "GOOGLE_ASSISTANT_WELCOME",
		"speech": "",
		"action": "LaunchRequest",
		"actionIncomplete": false,
		"parameters": {},
		"contexts": [{
			"name": "google_assistant_welcome",
			"parameters": {},
			"lifespan": 0
		}],
		"metadata": {
			"intentId": "cec07958-9e1e-63c1-a0f4-2bb4c3038f8b",
			"webhookUsed": "true",
			"webhookForSlotFillingUsed": "false",
			"intentName": "Initial intent LaunchIntent"
		},
		"fulfillment": {
			"speech": "",
			"messages": [{
				"type": 0,
				"speech": ""
			}]
		},
		"score": 1
	},
	"status": {
		"code": 200,
		"errorType": "success"
	},
	"sessionId": "1491343035545"
}'
```
