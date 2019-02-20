"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Get(path) {
    return helperForRoutes('get', path || '');
}
exports.Get = Get;
function Post(path) {
    return helperForRoutes('post', path || '');
}
exports.Post = Post;
function Put(path) {
    return helperForRoutes('put', path || '');
}
exports.Put = Put;
function Patch(path) {
    return helperForRoutes('patch', path || '');
}
exports.Patch = Patch;
function Delete(path) {
    return helperForRoutes('delete', path || '');
}
exports.Delete = Delete;
function helperForRoutes(httpVerb, path) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        var middleware = originalMethod.middleware || null;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return originalMethod.apply(this, args);
        };
        descriptor.value.routeProperties = {
            httpVerb: httpVerb,
            path: path ? "/" + path : '',
            middleware: middleware,
        };
        return descriptor;
    };
}
function Middleware(middleware) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return originalMethod.apply(this, args);
        };
        descriptor.value.middleware = middleware;
        return descriptor;
    };
}
exports.Middleware = Middleware;
//# sourceMappingURL=RouteDecorators.js.map