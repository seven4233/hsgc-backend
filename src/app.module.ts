import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRequired } from './middleware/auth.midderware';
import { UserController } from './user/user.controller';
import { SpiderModule } from './spider/spider.module';
import { MomentModule } from './moment/moment.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qhl4233..',
    database: 'hsgc',
    synchronize: true,
    autoLoadEntities: true,
    logging: true
  }), SpiderModule, MomentModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginRequired)
    .exclude('user/login', 'user/register', 'user/captcha')
    .forRoutes(UserController)
  }
}
