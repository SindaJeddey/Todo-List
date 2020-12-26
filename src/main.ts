import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    transform: true,
    whitelist: true, //Eliminate unnecessary data from request( extra that are not in the DTOs)
    forbidNonWhitelisted: true
    }))
  await app.listen(3000);
}
bootstrap();
