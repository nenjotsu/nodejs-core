import * as restify from 'restify';
import * as routeControllers from './RouteControllers';

import serverConfig from '../../infrastructure/webserver/configuration';

import { setupServer } from '../entities';

interface Controller {
  controllerBasePath?: string;
}

export class Server {
  private readonly _NOT_CTLR_ERR =
    'Value passed was not a valid controller. Please make sure to use ' +
    'a TypeScript class with the @Controller decorator and read documentation';

  protected readonly app_: any;

  constructor() {
    this.app_ = restify.createServer(serverConfig);
  }

  private setupServer(): void {
    setupServer(this.app_);
  }

  protected addControllers_(controllers: Array<Controller>): void {
    let count = 0;

    if (controllers instanceof Array) {
      controllers.forEach(controller => {
        if (!controller.controllerBasePath) {
          throw Error(this._NOT_CTLR_ERR);
        }
        routeControllers.setRoutes(
          this.app_,
          controller,
          controller.controllerBasePath,
        );
        count++;
      });
    }

    let s = count === 1 ? '' : 's';
    // console.log(count + ` controller${s} configured.`);

    this.setupServer();
  }
}
