import PostDto from "../dto/PostDto";
import Post from "../entities/Post";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

class PostService {
  // 글 목록
  public async getPostList(user: User): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.user_id = :userId", { userId: user.id })
      .getMany();
  }

  // 글조회
  public async getPost(user: User, id: string | number): Promise<Post> {
    return await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.user_id = :userId", { userId: user.id })
      .andWhere("id = :id", { id })
      .getOne();
  }

  // 글쓰기
  public async createPost(user: User, postDto: PostDto): Promise<void> {
    const post = new Post();
    post.title = postDto.title;
    post.content = postDto.content;
    post.user = user;
    post.regDate = new Date();
    post.modDate = new Date();

    await getRepository(Post).save(post);
  }

  // 글수정
  public async modifyPost(post: Post, postDto: PostDto): Promise<void> {
    post.title = postDto.title;
    post.content = postDto.content;
    post.modDate = new Date();

    await getRepository(Post).save(post);
  }

  // 글삭제
  public async deletePost(post: Post): Promise<void> {
    await getRepository(Post).remove(post);
  }
}

export default PostService;
