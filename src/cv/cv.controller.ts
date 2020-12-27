import { Body, Controller, Get, Post } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvEntity } from "./entities/cv.entity";
import { NewCvDto } from "./dto/new-cv.dto";

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

}
