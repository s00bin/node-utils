import HomeController from "../controllers/HomeController";
import Controller from "../interfaces/Controller";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";

class RouterConfig {
  private controllers: Controller[];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.controllers = [new HomeController(), new UserController(), new PostController()];
  }

  public getControllers() {
    return this.controllers;
  }
}

export default RouterConfig;
