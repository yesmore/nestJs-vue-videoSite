import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'

import { User } from './models/user.model'; // user模型
import { Course } from './models/course.model'
import { Episode } from './models/episode.model';
import { Document } from './models/document.model'

const models = TypegooseModule.forFeature([
  User, Course, Episode, Document
]) // 导出模型

@Global() // 标记为全局引用
@Module({
  imports: [
    // 连接数据库 异步加载
    // TypegooseModule.forRootAsync({
    //   useFactory(){
    //     return {
    //       uri: process.env.DB,
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //       useCreateIndex: true,
    //       useFindAndModify: false
    //     }
    //   }
    // }),
    TypegooseModule.forRoot('mongodb://localhost/nest-video', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }),
    models, // 导入
  ],
  providers: [DbService],
  exports: [DbService, models], // 导出
})
export class DbModule {}
