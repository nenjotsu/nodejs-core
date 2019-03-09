"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setRoutes(server, controller, controllerBasePath) {
    var _loop_1 = function (member) {
        var routeProps = controller[member].routeProperties;
        if (routeProps) {
            var callBack = function (req, res, next) { return controller[member](req, res, next); };
            var path = "" + controllerBasePath;
            if (routeProps.path) {
                path = "" + controllerBasePath + routeProps.path;
            }
            console.log(routeProps.httpVerb, path, "\x1b[36m");
            server[routeProps.httpVerb](path, callBack);
        }
    };
    for (var member in controller) {
        _loop_1(member);
    }
}
exports.setRoutes = setRoutes;
//# sourceMappingURL=RouteControllers.js.map