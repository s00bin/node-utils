import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { env } from "../configs/env";
import { TokenData } from "../interfaces/TokenData";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = env.app.jwtAccessSecret;

    try {
      const verificationResponse = jwt.verify(authorization, secret) as TokenData;
      const userId = verificationResponse.id;
      const userRepository = getRepository(User);
      const user = await userRepository.createQueryBuilder("user").where("user.id = :id", { id: userId }).getOne();
      if (user) {
        req.user = user;
      } else {
        return res.json({
          success: false,
          msg: "Wrong authentication token",
          code: 401,
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        msg: "Wrong authentication token",
        code: 401,
      });
    }
  } else {
    return res.json({
      success: false,
      msg: "Authentication token missing",
      code: 402,
    });
  }

  next();
};

export const generateAccessToken = (user: User) => {
  const tokenData: TokenData = {
    token: jwt.sign({ id: user.id }, env.app.jwtAccessSecret),
  };
  return tokenData;
};
