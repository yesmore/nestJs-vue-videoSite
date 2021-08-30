import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'  // 环境变量配置
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
   ConfigModule.forRoot({
     isGlobal: true // 表示在任意模块使用
   }),
   // JwtModule.registerAsync({
   //   useFactory(){
   //     return {
   //       secret: 'xxg0byqsyydsojbkcdxxgcdxlj'
   //     }
   //   }
   // }) ,
   // JwtModule.register({
   //   secret: 'xxg0byqsyydsojbkcdxxgcdxlj'
   // }) ,
   DbModule
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
