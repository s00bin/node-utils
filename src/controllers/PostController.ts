import Controller from "../interfaces/Controller";
import {Request, Response, Router} from "express";
import PostService from "../services/PostService";
import {isAuthenticated} from "../middlewares/AuthMiddleware";
import validationMiddleware from "../middlewares/ValidationMiddleware";
import PostDto from "../dto/PostDto";

class PostController implements Controller {

    public path = "/posts";
    public router = Router();

    private postService: PostService;

    constructor() {
        this.initializeRoutes();
        this.postService = new PostService();
    }

    initializeRoutes(): void {
        this.router.get(`${this.path}`, isAuthenticated, this.getPostList);
        this.router.get(`${this.path}/:id`, isAuthenticated, this.getPost);
        this.router.post(`${this.path}/edit`, isAuthenticated, validationMiddleware(PostDto), this.createPost);
        this.router.put(`${this.path}/:id/edit`, isAuthenticated, validationMiddleware(PostDto), this.modifyPost);
        this.router.delete(`${this.path}/:id`, isAuthenticated, this.deletePost);
    }

    public getPostList = async (req: Request, res: Response) => {
        const user = req.user;
        const postList = await this.postService.getPostList(user);
        res.json({success: true, msg: "OK", data: postList});
    }

    public getPost = async (req: Request, res: Response) => {
        const user = req.user;
        const postId = req.params.id;
        const post = await this.postService.getPost(user, postId);
        if (!post) {
            return res.json({success: false, msg: "존재하지 않는 게시글입니다.", code: 404});
        }

        res.json({success: true, msg: "OK", data: post});
    }

    public createPost = async (req: Request, res: Response) => {
        const user = req.user;
        const postDto = req.body;
        await this.postService.createPost(user, postDto);
        res.json({success: true, msg: "OK"});
    }

    public modifyPost = async (req: Request, res: Response) => {
        const user = req.user;
        const postId = req.params.id;
        const postDto = req.body;
        const post = await this.postService.getPost(user, postId);
        if (!post) {
            return res.json({success: false, msg: "존재하지 않는 게시글입니다.", code: 404});
        }
        await this.postService.modifyPost(post, postDto);

        res.json({success: true, msg: "OK"});
    }

    public deletePost = async (req: Request, res: Response) => {
        const user = req.user;
        const postId = req.params.id;
        const post = await this.postService.getPost(user, postId);
        if (!post) {
            return res.json({success: false, msg: "존재하지 않는 게시글입니다.", code: 404});
        }

        await this.postService.deletePost(post);

        res.json({success: true, msg: "OK"});
    }
}

export default PostController;