import * as restify from 'restify';
export declare function setupServer(app: any): void;
export declare const IController: (...args: any) => (action: any) => any;
export declare const IControllerAsync: (...args: any) => (action: any) => any;
export declare const GetController: (...args: any) => (action: any) => any;
export declare const GetControllerAsync: (...args: any) => (action: any) => any;
export declare type IActionType = {
    request: restify.Request;
    response: restify.Response;
    next: restify.Next;
};
export declare type IActionTypeAsync = {
    request: restify.Request;
    response: restify.Response;
    next: restify.Next;
    asyncMethod: Function;
};
export declare const IActionResult: (...args: any) => (request: any) => any;
export declare const IActionResultAsync: (...args: any) => (request: any) => any;
