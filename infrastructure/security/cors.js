"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    origins: [
        'http://*.ubidyapp.com',
        'http://*.ubidyapi.com',
        'https://*.ubidyapp.com',
        'https://*.ubidyapi.com',
        'http://employerdev.ubidywebsite.com:8081',
        'http://agencydev.ubidywebsite.com:8082',
    ],
    credentials: false,
    methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH', 'OPTIONS'],
    headers: ['authorization'],
};
//# sourceMappingURL=cors.js.map