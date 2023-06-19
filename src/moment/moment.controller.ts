import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MomentService } from './moment.service';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';

@Controller('moment')
export class MomentController {
  constructor(private readonly momentService: MomentService) {}

  @Post()
  create(@Body() createMomentDto: CreateMomentDto) {
    return this.momentService.create(createMomentDto);
  }

  @Get()
  findAll() {
    return this.momentService.getMomentList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.momentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMomentDto: UpdateMomentDto) {
    return this.momentService.update(+id, updateMomentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.momentService.remove(+id);
  }
}