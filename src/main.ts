import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { DurationInterceptor } from "./interceptors/duration.interceptor";
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    transform: true,
    whitelist: true, //Eliminate unnecessary data from request( extra that are not in the DTOs)
    forbidNonWhitelisted: true
    }))
  // app.useGlobalInterceptors(new DurationInterceptor()) : for global use of interceptors
  await app.listen(process.env.APP_PORT);
}
bootstrap();
