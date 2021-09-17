import { Request, Response, Router } from "express";
import Controller from "../interfaces/Controller";

class HomeController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.welcome);
    this.router.get(`${this.path}health`, this.healthCheck);
  }

  public welcome = (_: Request, res: Response) => {
    return res.send("Welcome !");
  };

  public healthCheck = (_: Request, res: Response) => {
    return res.send(true);
  };
}

export default HomeController;
