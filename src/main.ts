import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import * as session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilter())
  app.useGlobalInterceptors(new Response())
  app.useGlobalPipes(new ValidationPipe())
  app.use(session({ secret: 'linfeng', rolling: true, cookie: {maxAge:360000}, name:'sid'}))
  
  await app.listen(3000);
}
bootstrap();
