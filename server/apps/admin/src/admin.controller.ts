import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  // 文件上传
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    return {
      url: `http://aoau.top:3005/uploads/${file.filename}`
    }
  }
}
