import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv'
import { PayloadInterface } from "./interfaces/payload.interface";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.userRepository.findOne({username:payload.username})
    if(user){
      const {password, salt, ...rest} = user
      return rest;
    } else {
      throw new UnauthorizedException();
    }

  }
}