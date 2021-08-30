import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
// import { CoursesController } from '../../admin/src/courses/courses.controller';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';

// @ts-ignore
// @ts-ignore
@Module({
  imports: [CoursesModule, DbModule, AuthModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

