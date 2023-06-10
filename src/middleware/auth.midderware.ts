import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


interface MyRequest extends Request {
    currentUser: jwt.JwtPayload
}
/**
 * 验证登录中间件
 */
@Injectable()
export class LoginRequired implements NestMiddleware {
  use(req: MyRequest, res: Response, next: NextFunction) {

    let token = req.headers['authorization'];
    try {
      let userInfo = jwt.verify(token.replace('Bearer ', ''), 'linfeng');
      req.currentUser = userInfo as jwt.JwtPayload
      next();
    } catch (error) {
      throw new HttpException('请先登录', HttpStatus.UNAUTHORIZED);
    }
  }
}
