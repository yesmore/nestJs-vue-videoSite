import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
// import { DbModule } from '../../../libs/db/src';  // 手动导入
import { DbModule } from '@libs/db'; 
// import { CommonModule } from '@libs/common'
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    // CommonModule,
    MulterModule.register({
      dest: 'uploads' // 上传地址
    }), 
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
    DocumentsModule
  ],
  controllers: [AdminController, UsersController],
  providers: [AdminService],
})
export class AdminModule {}
