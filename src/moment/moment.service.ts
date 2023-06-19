import { Injectable } from '@nestjs/common';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MomentService {

  constructor(@InjectRepository(Moment) private readonly moment: Repository<Moment>){}

  create(createMomentDto: CreateMomentDto) {
    return 'This action adds a new moment';
  }

  // 获取所有动态
  async getMomentList() {

    let res = await this.moment.find()
    
    return {data: {list:res}};
  }

  findOne(id: number) {
   
  }

  update(id: number, updateMomentDto: UpdateMomentDto) {
    return `This action updates a #${id} moment`;
  }

  remove(id: number) {
    return `This action removes a #${id} moment`;
  }
}
