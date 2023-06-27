import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
// risadinha: &#x1F602;
// polegar: &#x1F44D;
// coração:&#x2764;
// choro:&#x1F62D;
// espanto:&#x1F632;
