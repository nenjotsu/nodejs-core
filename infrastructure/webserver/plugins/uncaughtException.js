"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    console.log('uncaught', err);
    next(err);
});
//# sourceMappingURL=uncaughtException.js.map