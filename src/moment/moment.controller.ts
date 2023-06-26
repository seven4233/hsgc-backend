import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MomentService } from './moment.service';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';

@Controller('moment')
export class MomentController {
  constructor(private readonly momentService: MomentService) {}

  /**
   * 发布动态
   * @param createMomentDto 
   * @returns 
   */
  @Post()
  create(@Body() createMomentDto: CreateMomentDto, @Req() req: any) {
    let ownerId = req.currentUser.id
    return this.momentService.create(createMomentDto, ownerId);
  }

  /**
   * 获取所有动态
   * @returns list
   */
  @Get()
  findAll() {
    return this.momentService.getMomentList();
  }

  /**
   * 根据 id 获取动态
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.momentService.findOne(+id);
  }

  /**
   * 根据 id 修改动态
   * @param id 
   * @param updateMomentDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMomentDto: UpdateMomentDto) {
    return this.momentService.update(+id, updateMomentDto);
  }

  /**
   * 根据 id 删除动态
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.momentService.remove(+id);
  }
}
