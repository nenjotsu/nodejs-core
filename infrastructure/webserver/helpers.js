"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var microservicesApi_1 = require("./microservicesApi");
var getReadFileSync = function (envName) {
    var envValue = fs.readFileSync(envName, 'utf8');
    return envValue;
};
var getMongodbConnectionString = function (env) {
    switch (env) {
        case 'production':
            return getReadFileSync(process.env.DOCUMENTS_MONGODB_CONNECTION_STRING_FILE || '');
        case 'uat':
            return getReadFileSync(process.env.DOCUMENTS_UAT_MONGODB_CONNECTION_STRING_FILE || '');
        default:
            return process.env.DOCUMENTS_DEVELOPMENT_MONGODB_CONNECTION_STRING_FILE;
    }
};
var getMongodbAuthDb = function (env) {
    switch (env) {
        case 'production':
            return getReadFileSync(process.env.DOCUMENTS_MONGODB_AUTH_DB_FILE || '');
        case 'uat':
            return getReadFileSync(process.env.DOCUMENTS_UAT_MONGODB_AUTH_DB_FILE || '');
        default:
            return process.env.DOCUMENTS_DEVELOPMENT_MONGODB_AUTH_DB_FILE;
    }
};
var getMongodbUser = function (env) {
    switch (env) {
        case 'production':
            return getReadFileSync(process.env.MONGODB_USER_FILE || '');
        case 'uat':
            return getReadFileSync(process.env.MONGODB_UAT_USER_FILE || '');
        default:
            return process.env.MONGODB_DEVELOPMENT_USER_FILE;
    }
};
var getMongodbPassword = function (env) {
    switch (env) {
        case 'production':
            return getReadFileSync(process.env.MONGODB_PASSWORD_FILE || '');
        case 'uat':
            return getReadFileSync(process.env.MONGODB_UAT_PASSWORD_FILE || '');
        default:
            return process.env.MONGODB_DEVELOPMENT_PASSWORD_FILE;
    }
};
var getMicroservices = function (env) {
    var routeList;
    var apis = {};
    microservicesApi_1.default.microserviceList.forEach(function (ms) {
        var apiRouteList = require("./microservicesApi/" + ms);
        Object.keys(apiRouteList).forEach(function (key) {
            routeList[key] = {
                method: apiRouteList[key]['method'],
                value: microservicesApi_1.default.getApiRoute(env, ms, apiRouteList[key]['value']),
            };
        });
        apis["" + ms] = routeList;
    });
    console.log(apis);
    return apis;
};
exports.default = {
    getMongodbConnectionString: getMongodbConnectionString,
    getMongodbAuthDb: getMongodbAuthDb,
    getMongodbUser: getMongodbUser,
    getMongodbPassword: getMongodbPassword,
    getMicroservices: getMicroservices,
};
//# sourceMappingURL=helpers.js.map