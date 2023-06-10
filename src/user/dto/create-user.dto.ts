import {Equals, IsNotEmpty, Length} from 'class-validator'

export class CreateUserDto {
    // 账号
    @IsNotEmpty()
    @Length(4, 11, {message:"账号长度为:4-11"})
    account: string;
    // 密码
    @IsNotEmpty()
    @Length(6,18, {message:"密码长度为:6-18"})
    password: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @Length(4, 11, {message:"账号长度为:4-11"})
    account: string

    @IsNotEmpty()
    @Length(6,18, {message:"密码长度为:6-18"})
    password: string

    @IsNotEmpty()
    @Length(6,18)
    confirmPassword: string
    @IsNotEmpty()

    @Length(4)
    captcha: string
}
