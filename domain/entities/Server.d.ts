interface Controller {
    controllerBasePath?: string;
}
export declare class Server {
    private readonly _NOT_CTLR_ERR;
    protected readonly app_: any;
    constructor();
    private setupServer;
    protected addControllers_(controllers: Array<Controller>): void;
}
export {};
