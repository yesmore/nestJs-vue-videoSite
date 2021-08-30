/*
*  jwt验证策略
* */
import {StrategyOptions, Strategy, ExtractJwt} from 'passport-jwt'
import {PassportStrategy} from "@nestjs/passport";
import {InjectModel} from "nestjs-typegoose";
import { User } from '@libs/db/models/user.model'
import {ReturnModelType} from "@typegoose/typegoose";
import {BadRequestException} from "@nestjs/common";
import {compareSync} from "bcryptjs";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头部取出token
      secretOrKey: 'xxg0byqsyydsojbkcdxxgcdxlj'
    } as StrategyOptions);
  }

  // 从客户端获取的username与password
  async validate(id){
    return await this.userModel.findById(id)

  }
}
