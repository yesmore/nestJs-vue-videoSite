/**
 * 课程数据模型
 */
import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, arrayProp, Ref } from '@typegoose/typegoose'
import { Episode } from './episode.model'

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class Course {
    @ApiProperty({ description: '课程名称', example: 'course' })
    @prop()
    name: string
    @ApiProperty({ description: '封面图片', example: 'cover' })
    @prop()
    cover: string

    @ApiProperty({ description: '课时列表' })
    @prop({ // 虚拟字段：并未保存在数据库，而是顺带关联查询
      ref: 'Episode',
      localField: '_id',
      foreignField: 'course'
    })    // 关联课时模型
    episodes: Ref<Episode>[]
    // @ApiProperty({ description: '课时列表' })
    // @prop({ Ref: 'Episode' })    // 关联课时模型
    // sourceList: Ref<Episode>[]
}
