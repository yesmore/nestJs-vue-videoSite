import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt'
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: 'xxg0byqsyydsojbkcdxxgcdxlj' })
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy]
})
export class AuthModule {}
