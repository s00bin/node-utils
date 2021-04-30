import { User } from "../entities/User";
import UserDto, { LoginDto } from "../dto/UserDto";
import { TokenData } from "../interfaces/TokenData";
import { getRepository } from "typeorm";

class UserService {

  // 회원가입
  public async join(userDto: UserDto): Promise<User> {
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    user.name = userDto.name;

    return await getRepository(User).save(user);
  }

  // 로그인
  public async login(loginDto: LoginDto): Promise<TokenData> {
    const user = await getRepository(User)
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email: loginDto.email })
        .getOne();

    if (!user) {
      return null;
    }

    if (!user.isPasswordMatch(loginDto.password)) {
      return null;
    }

    return user.createToken();
  }

  // 중복확인
  public async isDuplicateUser(email: string): Promise<boolean> {
    const user = await getRepository(User).findOne({ email });
    return !!user;
  }
}

export default UserService;
