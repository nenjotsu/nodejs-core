// import jwtCheck from '../../infrastructure/security/jwtCheck';

export function setRoutes(server, controller, controllerBasePath) {
  for (let member in controller) {
    let routeProps = controller[member].routeProperties;

    if (routeProps) {
      let callBack = (req, res, next) => controller[member](req, res, next);

      let path = `${controllerBasePath}`;
      if (routeProps.path) {
        path = `${controllerBasePath}${routeProps.path}`;
      }
      console.log(routeProps.httpVerb, path, "\x1b[36m");
      // server[routeProps.httpVerb](path, jwtCheck, callBack);
      server[routeProps.httpVerb](path, callBack);
    }
  }
}
