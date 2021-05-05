import { IsNotEmpty } from "class-validator";

class PostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

export default PostDto;
