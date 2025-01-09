import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStudentDto } from './create-student.dto'; // Replace with actual path
import { CreateMotiveDto } from 'src/motives/dto/create-motive.dto';  // Replace with actual path

export class CreateStudentWithMotiveDto {
  @ValidateNested()
  @Type(() => CreateStudentDto)
  student: CreateStudentDto;

  @ValidateNested()
  @Type(() => CreateMotiveDto)
  motive: CreateMotiveDto;
}
