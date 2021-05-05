import {Request, Response, Router} from "express";
import Controller from "../interfaces/Controller";
import UserService from "../services/UserService";
import {isAuthenticated} from "../middlewares/AuthMiddleware";
import validationMiddleware from "../middlewares/ValidationMiddleware";
import UserDto, {LoginDto} from "../dto/UserDto";

class UserController implements Controller {

    public path = "/auth";
    public router = Router();

    public userService: UserService;

    constructor() {
        this.initializeRoutes();
        this.userService = new UserService();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/join`, validationMiddleware(UserDto), this.join);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
        this.router.get(`${this.path}`, isAuthenticated, this.me);
    }

    public join = async (req: Request, res: Response) => {
        const userDto = req.body;
        const isDuplicateUser = await this.userService.isDuplicateUser(userDto.email);
        if (isDuplicateUser) {
            return res.json({ success: false, msg: "중복된 이메일입니다.", code: 990 });
        }

        await this.userService.join(userDto);
        return res.json({
            success: true,
            msg: "OK"
        });
    }

    public login = async (req: Request, res: Response) => {
        const loginDto = req.body;
        const token = await this.userService.login(loginDto);
        if (!token) {
            return res.json({
                success: false,
                msg: "아이디 또는 비밀번호가 틀렸습니다.",
                code: 999
            });
        }

        return res.json({
            success: true,
            msg: "OK",
            data: token
        });
    }

    public me = async (req: Request, res: Response) => {
        return res.json({
            success: true,
            msg: "OK",
            data: req.user
        });
    }
}

export default UserController;
