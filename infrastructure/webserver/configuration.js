"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken = require("jsonwebtoken");
exports.isExpired = function (expiresAt) {
    var currentTime = new Date().getTime();
    var isexp = currentTime > expiresAt;
    if (isexp) {
        return true;
    }
    return false;
};
exports.default = {
    name: 'NodeCoreAPI',
    formatters: {
        'application/json': function customizedFormatJSON(req, res, body) {
            var resultBody = body;
            if (body instanceof Error || body.statusCode === 500) {
                var isJwtExpired = false;
                var url = req.url, method = req.method, headers = req.headers;
                if (headers.authorization === undefined) {
                    isJwtExpired = true;
                }
                else {
                    var TOKEN = headers.authorization.replace('Bearer ', '');
                    var decoded = jsonwebtoken.decode(TOKEN);
                    isJwtExpired = exports.isExpired(decoded.exp);
                }
                if (JSON.stringify(body.body) === '{"code":"Internal","message":""}' &&
                    isJwtExpired) {
                    var message = headers.authorization === undefined
                        ? 'Token is required'
                        : 'Invalid Token or JWT Expired';
                    var reason = headers.authorization === undefined
                        ? 'UnauthorizedError'
                        : 'InvalidCredentialsError';
                    resultBody = {
                        statusCode: 401,
                        reason: reason,
                        message: message,
                    };
                    console.log('Error:', JSON.stringify(body) + " " + method + " " + headers.host + url);
                    res.statusCode = 401;
                }
                else {
                    var reason = body.body !== undefined && body.body.code !== undefined
                        ? body.body.code
                        : body.code !== undefined
                            ? body.code
                            : 'Something went wrong';
                    resultBody = {
                        statusCode: body.statusCode,
                        reason: reason,
                        message: body.message || '',
                    };
                }
            }
            else if (Buffer.isBuffer(body)) {
                resultBody = body.toString('base64');
            }
            var data = JSON.stringify(resultBody);
            res.setHeader('Content-Length', Buffer.byteLength(data));
            return data;
        },
    },
};
//# sourceMappingURL=configuration.js.map