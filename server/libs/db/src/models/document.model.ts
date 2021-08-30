/**
 * 课程数据模型
 */
import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class Document {
    @ApiProperty({ description: '文档名称', example: 'obj' })
    @prop()
    name: string

    @ApiProperty({ description: '文档链接', example: 'url' })
    @prop()
    docurl: string

    @ApiProperty({ description: '文档简介', example: 'info' })
    @prop()
    info: string
}
