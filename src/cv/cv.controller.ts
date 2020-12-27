import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvEntity } from "./entities/cv.entity";
import { NewCvDto } from "./dto/new-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";

@Controller('cv')
export class CvController {

  constructor(private cvService: CvService) {
  }

  @Get()
  async getAllCvs() : Promise<CvEntity[]>{
    return await this.cvService.getCvs();
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

}
