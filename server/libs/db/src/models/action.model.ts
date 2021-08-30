/**
 * 课时数据模型
 */
import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'
import { Course } from './course.model'
import { Episode } from './episode.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Action{
    @ApiProperty({ description: '用户', example: 'name' })
    @prop({ref: 'User'})
    user: Ref<User>

    @ApiProperty({ description: '类型', example: 'url' })
    @prop({ enum: ['Course', 'Episode'] })  // 限制只有课时与课程
    type: string

    @ApiProperty({ description: '操作对象', example: 'name' })
    @prop({refPath:'type'})
    object: Ref<Course|Episode>

    @ApiProperty({ description: '操作名称', example: 'name' })
    @prop({ enum: ['like', 'upVote'] })    // 枚举‘点赞’、‘up’
    name: string
}
