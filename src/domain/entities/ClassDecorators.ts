export function Controller(path: string) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public controllerBasePath = '/' + path;
    };
  };
}
