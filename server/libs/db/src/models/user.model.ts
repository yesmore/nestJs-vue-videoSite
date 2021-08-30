/**
 * 用户数据模型
 */
import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import {hashSync} from 'bcryptjs'
import { Course } from './course.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User{
    @ApiProperty({ description: '用户名', example: 'userName' })
    @prop()
    username: string

    @ApiProperty({ description: '密码', example: 'userPwd' })
    @prop({
        select: false,  //  默认不显示
        get(val){       // 这里因为用set必须加上get，可能是bug
          return val
        },
        set(val){       // 散列加密
            return val ? hashSync(val) : val
        }
    })
    password: string

    // @ApiProperty({ description: '用户收藏' })
    // @prop({ ref: 'Course' })
    // liked: Ref<Course>[]
}
