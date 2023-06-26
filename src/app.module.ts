import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRequired } from './middleware/auth.midderware';
import { UserController } from './user/user.controller';
import { SpiderModule } from './spider/spider.module';
import { MomentModule } from './moment/moment.module';
import { MomentController } from './moment/moment.controller';

@Module({
  imports: [UserModule, MomentModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qhl4233..',
    database: 'hsgc',
    synchronize: true,
    autoLoadEntities: true,
    logging: true
  }), SpiderModule, ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
// 使用登录中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginRequired)
    .exclude('user/login', 'user/register', 'user/captcha', {path:'moment',method:RequestMethod.GET})
    .forRoutes(UserController, MomentController)
  }
}
