import { Controller, Get, Query } from '@nestjs/common';
import { SpiderService } from './spider.service';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}
  /**
   * 获取学院列表
   */
  @Get('college')
  queryCollege() {
    return this.spiderService.getCollegeList();
  }

  /**
   * 获取专业列表
   */
  @Get('major')
  queryMajor(@Query('code') code) {
   
    console.log(code);
    return this.spiderService.getMajorList(code);
  }
}
