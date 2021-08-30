/**
 * 课时数据模型
 */
import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Course } from './course.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Episode{
    @ApiProperty({ description: '课时名称', example: 'name' })
    @prop()
    name: string
    @ApiProperty({ description: '课时资源', example: 'url' })
    @prop()
    file: string

    @ApiProperty({ description: '关联课程' })
    @prop({ ref: 'Course' })    // 关联课时模型
    course: Ref<Course> 
} 
