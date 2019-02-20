"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwtCheck_1 = require("../../infrastructure/security/jwtCheck");
function setRoutes(server, controller, controllerBasePath) {
    var _loop_1 = function (member) {
        var routeProps = controller[member].routeProperties;
        if (routeProps) {
            var callBack = function (req, res, next) { return controller[member](req, res, next); };
            var path = "" + controllerBasePath;
            if (routeProps.path) {
                path = "" + controllerBasePath + routeProps.path;
            }
            console.log(routeProps.httpVerb, path, '\x1b[36m');
            server[routeProps.httpVerb](path, jwtCheck_1.default, callBack);
        }
    };
    for (var member in controller) {
        _loop_1(member);
    }
}
exports.setRoutes = setRoutes;
//# sourceMappingURL=RouteControllers.js.map