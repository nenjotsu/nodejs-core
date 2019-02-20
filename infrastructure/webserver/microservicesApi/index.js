"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var microserviceList = ['auctionApi'];
var getApiRoute = function (env, controller, routeName) {
    var path = "../config." + env;
    var domain = require(path);
    var fullRoute = "" + domain[controller] + routeName.toLowerCase();
    return fullRoute;
};
exports.default = {
    getApiRoute: getApiRoute,
    microserviceList: microserviceList,
};
//# sourceMappingURL=index.js.map