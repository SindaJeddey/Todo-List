import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvEntity } from "./entities/cv.entity";
import { NewCvDto } from "./dto/new-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { UpdateResult } from "typeorm";

@Controller('cv')
export class CvController {

  constructor(private cvService: CvService) {
  }

  @Get()
  async getAllCvs() : Promise<CvEntity[]>{
    return await this.cvService.getCvs();
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
  async addCv(
    @Body() newCv: NewCvDto
  ) : Promise<CvEntity> {
    return await this.cvService.addCv(newCv);
  }

  @Patch('/:id')
  async updateCv(
    @Param('id', ParseIntPipe) id,
    @Body() updates: UpdateCvDto
  ) : Promise<CvEntity> {
    return await this.cvService.updateCv(id,updates);
  }

  @Delete('/:id')
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
