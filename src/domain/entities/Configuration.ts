import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import corsConfig from '../../infrastructure/security/cors';

export function setupServer(app): void {
  const cors = corsMiddleware(corsConfig);
  app.use(restify.plugins.acceptParser(app.acceptable));
  app.use(restify.plugins.queryParser());
  app.use(restify.plugins.bodyParser());
  app.pre(restify.pre.sanitizePath());

  app.use(restify.plugins.authorizationParser());
  app.use(restify.plugins.fullResponse());
  app.pre(restify.pre.sanitizePath());
  app.pre(restify.pre.pause());
  app.pre(restify.pre.userAgentConnection());

  app.pre(cors.preflight);
  app.use(cors.actual);
}

const asyncMethod = (payload: any): Promise<string> => {
  return new Promise(resolve => {
    resolve(payload);
  });
};

export const IController = (...args: any) => (action: any): any => (
  controller: Function,
): any => {
  const request: restify.Request = args[0];
  const response: restify.Response = args[1];
  const next: restify.Next = args[2];
  action(response, next, controller)({
    params: request.params || {},
    query: request.query || {},
    body: request._body ? JSON.parse(request._body) : {},
    authorization: request.authorization || {},
  });
};

// console

export const IControllerAsync = (...args: any) => (action: any): any => (
  controller: Function,
): any => {
  const request: restify.Request = args[0];
  const response: restify.Response = args[1];
  const next: restify.Next = args[2];
  action(response, next, controller)({
    params: request.params || {},
    query: request.query || {},
    body: request._body ? JSON.parse(request._body) : {},
    authorization: request.authorization || {},
  });
};

export const GetController = (...args: any) => (action: any): any => (
  controller: Function,
): any => {
  const request: restify.Request = args[0];
  const response: restify.Response = args[1];
  const next: restify.Next = args[2];
  action(response, next, controller)({
    params: request.params || {},
    query: request.query || {},
    body: request._body ? JSON.parse(request._body) : {},
    authorization: request.authorization || {},
  });
};

export const GetControllerAsync = (...args: any) => (action: any): any => (
  controller: Function,
): any => {
  const request: restify.Request = args[0];
  const response: restify.Response = args[1];
  const next: restify.Next = args[2];
  action(response, next, controller)({
    params: request.params || {},
    query: request.query || {},
    body: request._body ? JSON.parse(request._body) : {},
    authorization: request.authorization || {},
  });
};

export type IActionType = {
  request: restify.Request;
  response: restify.Response;
  next: restify.Next;
};

export type IActionTypeAsync = {
  request: restify.Request;
  response: restify.Response;
  next: restify.Next;
  asyncMethod: Function;
};

export const IActionResult = (...args: any) => (request: any): any => {
  const response: restify.Response = args[0];
  const next: restify.Next = args[1];
  const actionController: Function = args[2];
  return actionController({ request, response, next });
};

export const IActionResultAsync = (...args: any) => (request: any): any => {
  const response: restify.Response = args[0];
  const next: restify.Next = args[1];
  const actionController: Function = args[2];
  return actionController({ request, response, next, asyncMethod });
};
