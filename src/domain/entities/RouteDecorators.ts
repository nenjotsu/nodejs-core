export function Get(path?: string) {
  return helperForRoutes('get', path || '');
}

export function Post(path?: string) {
  return helperForRoutes('post', path || '');
}

export function Put(path?: string) {
  return helperForRoutes('put', path || '');
}

export function Patch(path?: string) {
  return helperForRoutes('patch', path || '');
}

export function Delete(path?: string) {
  return helperForRoutes('delete', path || '');
}

function helperForRoutes(httpVerb: string, path?: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const middleware = originalMethod.middleware || null;

    descriptor.value = function(...args: any[]) {
      // console.log('args', args);
      return originalMethod.apply(this, args);
    };

    descriptor.value.routeProperties = {
      httpVerb: httpVerb,
      path: path ? `/${path}` : '',
      middleware: middleware,
    };

    return descriptor;
  };
}

export function Middleware(middleware: Function | Function[]) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      return originalMethod.apply(this, args);
    };

    descriptor.value.middleware = middleware;

    return descriptor;
  };
}
