import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { Document } from '@libs/db/models/document.model';
import { InjectModel } from 'nestjs-typegoose';
import {ReturnModelType} from "@typegoose/typegoose";

@Crud({
  model: Document,
  routes: {
    create: false,
    update: false,
    delete: false,
  }
})
@Controller('documents')
@ApiTags('文档')
export class DocumentsController {
  constructor(
    @InjectModel(Document) private readonly model: ReturnModelType<typeof Document>
  ){}
}
