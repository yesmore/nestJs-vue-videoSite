import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Course,
  routes: {
    create: false,
    update: false,
    delete: false,
  }
})
@Controller('courses')
@ApiTags('系列')
export class CoursesController {
  constructor(
    @InjectModel(Course) private model
  ){}
}
