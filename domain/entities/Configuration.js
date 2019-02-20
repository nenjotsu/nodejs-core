"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var corsMiddleware = require("restify-cors-middleware");
var cors_1 = require("../../infrastructure/security/cors");
function setupServer(app) {
    var cors = corsMiddleware(cors_1.default);
    app.use(restify.plugins.acceptParser(app.acceptable));
    app.use(restify.plugins.queryParser());
    app.use(restify.plugins.bodyParser());
    app.pre(restify.pre.sanitizePath());
    app.use(restify.plugins.authorizationParser());
    app.use(restify.plugins.fullResponse());
    app.pre(restify.pre.sanitizePath());
    app.pre(restify.pre.pause());
    app.pre(restify.pre.userAgentConnection());
    app.pre(cors.preflight);
    app.use(cors.actual);
}
exports.setupServer = setupServer;
var asyncMethod = function (payload) {
    return new Promise(function (resolve) {
        resolve(payload);
    });
};
exports.IController = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (action) { return function (controller) {
        var request = args[0];
        var response = args[1];
        var next = args[2];
        action(response, next, controller)({
            params: request.params || {},
            query: request.query || {},
            body: request._body ? JSON.parse(request._body) : {},
            authorization: request.authorization || {},
        });
    }; };
};
exports.IControllerAsync = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (action) { return function (controller) {
        var request = args[0];
        var response = args[1];
        var next = args[2];
        action(response, next, controller)({
            params: request.params || {},
            query: request.query || {},
            body: request._body ? JSON.parse(request._body) : {},
            authorization: request.authorization || {},
        });
    }; };
};
exports.GetController = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (action) { return function (controller) {
        var request = args[0];
        var response = args[1];
        var next = args[2];
        action(response, next, controller)({
            params: request.params || {},
            query: request.query || {},
            body: request._body ? JSON.parse(request._body) : {},
            authorization: request.authorization || {},
        });
    }; };
};
exports.GetControllerAsync = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (action) { return function (controller) {
        var request = args[0];
        var response = args[1];
        var next = args[2];
        action(response, next, controller)({
            params: request.params || {},
            query: request.query || {},
            body: request._body ? JSON.parse(request._body) : {},
            authorization: request.authorization || {},
        });
    }; };
};
exports.IActionResult = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (request) {
        var response = args[0];
        var next = args[1];
        var actionController = args[2];
        return actionController({ request: request, response: response, next: next });
    };
};
exports.IActionResultAsync = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (request) {
        var response = args[0];
        var next = args[1];
        var actionController = args[2];
        return actionController({ request: request, response: response, next: next, asyncMethod: asyncMethod });
    };
};
//# sourceMappingURL=Configuration.js.map