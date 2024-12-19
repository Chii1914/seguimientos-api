import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentStateDto } from './create-student-state.dto';

export class UpdateStudentStateDto extends PartialType(CreateStudentStateDto) {}
