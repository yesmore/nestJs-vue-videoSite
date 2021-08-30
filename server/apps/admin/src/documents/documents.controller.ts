import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { Document } from '@libs/db/models/document.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Document
})
@Controller('documents')
@ApiTags('文档')
export class DocumentsController {
  constructor(
    @InjectModel(Document) private readonly model: ReturnModelType<typeof Document>
  ){}
}
