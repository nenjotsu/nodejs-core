"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var routeControllers = require("./RouteControllers");
var configuration_1 = require("../../infrastructure/webserver/configuration");
var entities_1 = require("../entities");
var Server = (function () {
    function Server() {
        this._NOT_CTLR_ERR = 'Value passed was not a valid controller. Please make sure to use ' +
            'a TypeScript class with the @Controller decorator and read documentation';
        this.app_ = restify.createServer(configuration_1.default);
    }
    Server.prototype.setupServer = function () {
        entities_1.setupServer(this.app_);
    };
    Server.prototype.addControllers_ = function (controllers) {
        var _this = this;
        var count = 0;
        if (controllers instanceof Array) {
            controllers.forEach(function (controller) {
                if (!controller.controllerBasePath) {
                    throw Error(_this._NOT_CTLR_ERR);
                }
                routeControllers.setRoutes(_this.app_, controller, controller.controllerBasePath);
                count++;
            });
        }
        var s = count === 1 ? '' : 's';
        this.setupServer();
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map