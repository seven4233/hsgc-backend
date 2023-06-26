import { Injectable } from '@nestjs/common';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MomentService {
  constructor(
    @InjectRepository(Moment) private readonly moment: Repository<Moment>,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  // 发布动态
  async create(createMomentDto: CreateMomentDto, ownerId: number) {
    let res = await this.moment.save({ ...createMomentDto, ownerId });
    return '动态发布成功!';
  }

  // 获取所有动态
  async getMomentList() {
    let momentList = await this.moment.find({ order: { createdAt: 'DESC' } });
    let res: any = [];
    for (let i = 0; i < momentList.length; i++) {
      let userInfo = await this.user.findOne({
        where: { id: momentList[i]?.ownerId },
        select: ['avatar', 'username', 'gender', 'email'],
      });
      res.push({ ...momentList[i], userInfo });
    }
    return { data: { list: res } };
  }

  // 根据id获取动态
  async findOne(id: number) {
    let moment = await this.moment.findOne({
      where: { id },
      relations: ['user'],
    });
    return { result: moment };
  }

  update(id: number, updateMomentDto: UpdateMomentDto) {
    return `This action updates a #${id} moment`;
  }

  remove(id: number) {
    return `This action removes a #${id} moment`;
  }
}
