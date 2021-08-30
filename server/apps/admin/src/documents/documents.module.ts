import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController]
})
export class DocumentsModule {}
