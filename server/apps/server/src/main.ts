import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // swagger
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors() // 允许跨域
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })  // 托管静态目录

  const config = new DocumentBuilder()
    .setTitle('白云轻舍-前端Api')
    .setDescription('供前端界面调用(3006)。<hr>一个基于`nodeJs(nestJs)`+`Vue`+`MongoDB`开发的全栈架构视频网站，采用单体仓库模式，客户端包括PC网站、app、小程序端。')
    .setVersion('1.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('video-server-api', app, document);

  const port = 3006
  await app.listen(port);

  console.log('前端服务器已运行：http://localhost:'+port);
  console.log('前端Api地址：http://localhost:'+port + '/video-server-api');
}
bootstrap();
