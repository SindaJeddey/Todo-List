import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { FirstMiddleware } from "./middlewares/first.middleware";
import { logger } from "./middlewares/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv'

dotenv.config();
@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"] ,
      synchronize: true // les entités crées seront directement mappées dans la DB
    }),
    CvModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware,logger).forRoutes(
      {path:'todo',method:RequestMethod.GET},
      {path:'todo*',method:RequestMethod.DELETE})
  }
}
