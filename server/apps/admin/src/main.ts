import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // swagger
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors() // 允许跨域
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })  // 托管静态目录

  const config = new DocumentBuilder()
    .setTitle('白云轻舍-后台管理Api')
    .setDescription('供后台管理界面调用(3005)。<hr>一个基于`nodeJs(nestJs)`+`Vue`+`MongoDB`开发的全栈架构视频网站，采用单体仓库模式，客户端包括PC网站、app、小程序端。')
    .setVersion('1.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('video-admin-api', app, document);

  const port = 3005
  await app.listen(port);

  console.log('后台服务器已运行：http://localhost:'+port);
  console.log('后台Api地址：http://localhost:'+port + '/video-admin-api');
}
bootstrap();
