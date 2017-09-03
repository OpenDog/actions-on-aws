var Assistant = require("actions-on-google").ApiAiApp;
var expressMockery = require("node-mocks-http");

exports.handler = function(event, context, callback) {

    // With the bespoken proxy the event is the payload. In your lambda it is very likely different!
    var assistant = getAssistant(event);

    // Do your thing ...
    assistant.tell("We fooled Google! Yay! Check out the bespoken tools!")

    var response = JSON.stringify(assistant.response_._getData());

    callback(null, response);
};

function getAssistant(requestBody) {

    // Prep the request and response.
    var mockRequest = expressMockery.createRequest({
        body: requestBody
    });

    var mockResponse = expressMockery.createResponse();

    // We need this monkey patch because node-mocks-http doesn't have the append.
    mockResponse["append"] = (header, value) => {
        console.log("Google SDK added a header: \"" + header + "\": \"" + value + "\"");
    };

    // Feed the request/response to the assistant SDK
    return new Assistant({ request: mockRequest, response: mockResponse });
}

