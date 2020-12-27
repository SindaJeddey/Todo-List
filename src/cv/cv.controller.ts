import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvEntity } from "./entities/cv.entity";
import { NewCvDto } from "./dto/new-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../user/guards/jwt-auth.guard";
import { Request } from "express";
import { User } from "../decorators/user.decorator";

@Controller('cv')
export class CvController {

  constructor(private cvService: CvService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCvs(
    @User() user
  ) : Promise<CvEntity[]>{
    return await this.cvService.getCvs(user);
  }

  @Get("/age/:minAge/:maxAge")
  async getNbCvByAge(
    @Param('minAge', ParseIntPipe) min,
    @Param('maxAge', ParseIntPipe) max
  ){
    return await this.cvService.statCvNumberByAge(max,min);
  }

  @Get("/:id")
  async getCv(
    @Param('id',ParseIntPipe) id
  ) : Promise<CvEntity>{
    return await this.cvService.getCvById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() newCv: NewCvDto,
    @User() user
  ) : Promise<CvEntity> {
    return await this.cvService.addCv(newCv,user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Param('id', ParseIntPipe) id,
    @Body() updates: UpdateCvDto
  ) : Promise<CvEntity> {
    return await this.cvService.updateCv(id,updates);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCv(
    @Param('id',ParseIntPipe) id
  ) : Promise<CvEntity>{
    return this.cvService.softDeleteCv(id);
  }

  @Get('/recover/:id')
  async recoverCv(
    @Param('id',ParseIntPipe) id
  ): Promise<UpdateResult>{
    return this.cvService.restoreCv(id);
  }
}
