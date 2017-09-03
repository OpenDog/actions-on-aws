let Assistant = require("actions-on-google").ApiAiApp;
let expressMockery = require("node-mocks-http");

exports.handler = (event, context, callback) => {

    // With the bespoken proxy the event is the payload. In your lambda it is different!
    let assistant = getAssistant(event);

    // Do your thing ...
    assistant.tell("We fooled Google! Yay! Check out the bespoken tools!")

    let response = JSON.stringify(assistant.response_._getData());

    callback(null, response);
};

function getAssistant(requestBody) {

    // Prep the request and response.
    let mockRequest = expressMockery.createRequest({
        body: requestBody
    });

    let mockResponse = expressMockery.createResponse();

    // We need this monkey patch because node-mocks-http doesn't have the append.
    mockResponse["append"] = (header, value) => {
        console.log("Google SDK added a header: \"" + header + "\": \"" + value + "\"");
    };

    // Feed the request/response to the assistant SDK
    return new Assistant({ request: mockRequest, response: mockResponse });
}

