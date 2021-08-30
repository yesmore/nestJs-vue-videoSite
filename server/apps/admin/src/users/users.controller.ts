import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model'
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User // 传递给model
})
@Controller('users')
@ApiTags('用户')  // 标签分组
export class UsersController {
  // 注入user模型 到model
  constructor(@InjectModel(User) private readonly model){}
}
