import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  /**
   * 获取当前用户
   */
 async getCurrentUser(req){
  const {id} = req.currentUser
  
  const currentUser =   await this.user.findOneBy(id)
  return {message:"获取当前用户信息成功", data: currentUser}
 }

  // 登录
  async login(user: CreateUserDto) {
    console.log(user);
    // 参数校验
    const { account, password } = user;
    const res = await this.user.findOne({ where: { account, password } });

    if (!res) throw new HttpException("账号或密码错误", HttpStatus.BAD_REQUEST);
  
    // 生成token
    const payload = {id: res.id, account: res.account}
    const token =  jwt.sign(payload, 'linfeng', {expiresIn: '30 days'})
    return {message: "登录成功!", data: token};
  }

  // 注册
  async register(p: RegisterDto, session: {code:string}) {
    const {account, password, captcha, confirmPassword } = p
    if(password !== confirmPassword) {
      throw new HttpException("两次输入的密码不一致", HttpStatus.BAD_REQUEST)
    }
    // 判断验证码 
    if(session.code?.toLocaleLowerCase() !==captcha?.toLocaleLowerCase() ){
      throw new HttpException("验证码错误", HttpStatus.BAD_REQUEST)
    }

    // 是否存在
    const isExist = await this.user.findOneBy({account})
    if(isExist){
      throw new HttpException("账号已存在", HttpStatus.CONFLICT)
    }
    await this.user.save({account, password})
    session.code = null
    return "注册成功!"
  }

  create(createUserDto: CreateUserDto) {
    return this.user.save(createUserDto);
  }

  async findAll() {
    let users = await this.user.find();
    return {data: users}
  }

  findOne(id: number) {
    const user = this.user.findOneBy({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.user.softDelete({ id });
  }
}
