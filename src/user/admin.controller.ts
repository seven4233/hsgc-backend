import { Controller, Delete, Post, Get, Patch, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
type QueryUserParams = {
  current?: number;
  pageSize?: number;
  username?: string;
  account?:string
}
@Controller('admin/user')
export class AdminController {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  
  /**
   * 获取用户列表
   * @returns 
   */

  @Get()
  async findAll(@Query() params:QueryUserParams) {
    console.log(params);
    let {current, pageSize, username, account} = params
    current = +current
    pageSize = + pageSize


    let whereCondition:any = {}
    if(username){
      whereCondition.username = Like(`%${username}%`)
    }
    if(account) {
      whereCondition.account = Like(`%${account}%`)
    }

    let res = await this.user.find({
      relations:["tags"],
      where: whereCondition
    });
    return { result: res, message: '获取用户列表成功' };
  }

  @Get(':id')
  async findOne(@Param("id") id: number) {
    const user = await this.user.findOneBy({id});
    return {result: user};
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return  this.user.save(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    
    return this.user.update({ id: +id }, updateUserDto);
  }

  @Delete(':id')
  remove(@Param("id") id: number) {
    return this.user.softDelete({ id });
  }
}
