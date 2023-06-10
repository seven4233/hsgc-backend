import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRequired } from './middleware/auth.midderware';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, DatabaseModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qhl4233..',
    database: 'hsgc',
    synchronize: true,
    autoLoadEntities: true
  })],
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
