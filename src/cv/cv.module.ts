import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvEntity } from "./entities/cv.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity])], // responsable de la creation d'un repository lié à cv entity
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
