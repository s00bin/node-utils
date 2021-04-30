import HomeController from "../controllers/HomeController";
import Controller from "../interfaces/Controller";
import UserController from "../controllers/UserController";

class RouterConfig {
    private controllers: Controller[];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.controllers = [new HomeController(), new UserController()];
    }

    public getControllers() {
        return this.controllers;
    }
}

export default RouterConfig;
