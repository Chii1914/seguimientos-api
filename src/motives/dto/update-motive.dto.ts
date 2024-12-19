import { PartialType } from '@nestjs/mapped-types';
import { CreateMotiveDto } from './create-motive.dto';

export class UpdateMotiveDto extends PartialType(CreateMotiveDto) {}
