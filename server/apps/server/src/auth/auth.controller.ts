import {Controller, Post, Get, Body, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {InjectModel} from "nestjs-typegoose";
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose';
import {AuthGuard} from "@nestjs/passport";
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
@ApiTags('权限管理')
export class AuthController {
  constructor(  // 注入模型
    private readonly jwtService: JwtService,
    @InjectModel(User) private userModel:ReturnModelType<typeof User>
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() dto:RegisterDto) {
    const { username, password } = dto
    const user = await this.userModel.create({
      username,
      password
    })
    return user
  }

  @Post('login')
  @ApiOperation({ summary: '用户登陆' })
  @UseGuards(AuthGuard('local'))  // 本地策略
  async login(@Body() dto: LoginDto, @Req() req) {
    return {
      token: this.jwtService.sign({_id:String(req.user._id)}),
    }
  }

  @Get('user')
  @ApiOperation({ summary: '用户信息' })
  @UseGuards(AuthGuard('jwt'))  // jwt策略
  @ApiBearerAuth()
  async user(@Req() req) {
    return req.user
  }
}
