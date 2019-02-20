import * as fs from 'fs';
// import { getApiRoute, microserviceList } from './microservicesApi';
import microservicesApi from './microservicesApi';

const getReadFileSync = (envName: string) => {
  const envValue = fs.readFileSync(envName, 'utf8');
  return envValue;
};

const getMongodbConnectionString = (env: string) => {
  switch (env) {
    case 'production':
      return getReadFileSync(
        process.env.DOCUMENTS_MONGODB_CONNECTION_STRING_FILE || '',
      );
    case 'uat':
      return getReadFileSync(
        process.env.DOCUMENTS_UAT_MONGODB_CONNECTION_STRING_FILE || '',
      );

    default:
      return process.env.DOCUMENTS_DEVELOPMENT_MONGODB_CONNECTION_STRING_FILE;
  }
};

const getMongodbAuthDb = (env: string) => {
  switch (env) {
    case 'production':
      return getReadFileSync(process.env.DOCUMENTS_MONGODB_AUTH_DB_FILE || '');
    case 'uat':
      return getReadFileSync(
        process.env.DOCUMENTS_UAT_MONGODB_AUTH_DB_FILE || '',
      );

    default:
      return process.env.DOCUMENTS_DEVELOPMENT_MONGODB_AUTH_DB_FILE;
  }
};

const getMongodbUser = (env: string) => {
  switch (env) {
    case 'production':
      return getReadFileSync(process.env.MONGODB_USER_FILE || '');
    case 'uat':
      return getReadFileSync(process.env.MONGODB_UAT_USER_FILE || '');

    default:
      return process.env.MONGODB_DEVELOPMENT_USER_FILE;
  }
};

const getMongodbPassword = (env: string) => {
  switch (env) {
    case 'production':
      return getReadFileSync(process.env.MONGODB_PASSWORD_FILE || '');
    case 'uat':
      return getReadFileSync(process.env.MONGODB_UAT_PASSWORD_FILE || '');

    default:
      return process.env.MONGODB_DEVELOPMENT_PASSWORD_FILE;
  }
};

const getMicroservices = (env: string) => {
  type RouteItem = {
    method: string;
    value: string;
  };
  let routeList: RouteItem;
  let apis = {};
  microservicesApi.microserviceList.forEach(ms => {
    const apiRouteList = require(`./microservicesApi/${ms}`);
    Object.keys(apiRouteList).forEach(key => {
      routeList[key] = {
        method: apiRouteList[key]['method'],
        value: microservicesApi.getApiRoute(
          env,
          ms,
          apiRouteList[key]['value'],
        ),
      };
    });

    apis[`${ms}`] = routeList;
  });
  console.log(apis);
  return apis;
};

export default {
  getMongodbConnectionString,
  getMongodbAuthDb,
  getMongodbUser,
  getMongodbPassword,
  getMicroservices,
};
