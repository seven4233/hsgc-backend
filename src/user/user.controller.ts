import { Controller, Get, Post, Body, Patch, Param, Delete, Req,Res, Session, Headers, HttpException, HttpStatus, Head } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
   * 添加用户接口
   * @param createUserDto 
   * @returns 
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
