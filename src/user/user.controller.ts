import { Controller, Get, Post, Body, Patch, Param, Delete, Req,Res, Session, Headers, HttpException, HttpStatus, Head } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'
import { mac, putPolicy } from './qiniu';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';


interface ITag {
  id?:number
  key: string
  label: string
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, @InjectRepository(Tag) private readonly tag: Repository<Tag>) {}
  /**
   * 获取当前用户信息
   */
  @Get('currentUser')
  currentUser(@Req() req){
    return this.userService.getCurrentUser(req)
  
  }

  /**
   *  账号登录接口
   */
  @Post('login')
  login(@Body() user: CreateUserDto){
    return this.userService.login(user)
  }

  /**
   * 账号注册接口
   */
  @Post('register')
  register(@Body() user: RegisterDto, @Session() session){
    return this.userService.register(user, session)
  }

  /**
   * 获取验证码
   */
  @Get('captcha')
  createCode( @Res() res, @Req() req, @Session() session ){
    const captcha = svgCaptcha.create({
      size: 4,
      width: 100,
      height: 40,
      background: "#dbebfd",
    })
    
    session.code = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
  /**
   * 退出登录
   */
  @Post("outLogin")
  logout(){
    return {message: "退出登录成功"}
  }

  /**
   * 获取qiniu token
   */

  @Get("uploadToken")
  getUploadToken(){
   const uploadToken =  putPolicy.uploadToken(mac)
   return {message:"获取uploadtoken成功", uploadToken}
  }


  /**
   * 添加标签
   */
  @Post("tag")
  async createTag(@Body() tags:ITag[], @Req() req){
 
    let {id:userId} = req.currentUser
    let tagList:ITag[] = []
    for(let i = 0; i< tags.length; i++){
      // 先查询,如果标签已存在, 则不创建
     let isExist =   await this.tag.findOne({where:{ key: tags[i].key, label: tags[i].label}})
      if(isExist){
        tagList.push(isExist)
        continue
      }
      const T = new Tag()
      T.key = tags[i].key
      T.label = tags[i].label
      T.user = userId
      
      let res = await this.tag.save(T)
      tagList.push(res)
    }
    return {result: tagList}
  }

}




