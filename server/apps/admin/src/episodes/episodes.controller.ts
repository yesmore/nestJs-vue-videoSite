import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
  ){}

  @Get('allcourses')
  async allCourses(){
    const courses = await this.courseModel.find()
    return courses
  }
}
