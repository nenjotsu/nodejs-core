"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://accounts.ubidyapp.com/.well-known/jwks.json',
    }),
    audience: 'https://ubidy-api-endpoint/',
    issuer: 'https://accounts.ubidyapp.com/',
    algorithms: ['RS256'],
});
exports.default = jwtCheck;
//# sourceMappingURL=jwtCheck.js.map