"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
function default_1(req, res) {
    if (req.method.toUpperCase() === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', restify.CORS.ALLOW_HEADERS.join(', '));
        res.send(200);
    }
    else {
        res.send(new restify.MethodNotAllowedError());
    }
}
exports.default = default_1;
//# sourceMappingURL=restify.notAllowed.js.map