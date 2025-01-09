import { Body, Controller, Post } from '@nestjs/common';
import { DemoService } from '../services/demo.service';

@Controller('demos')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('three-sat/run')
  async runThreeSatDemo(@Body() params: { n: number; ratio: number }) {
    return this.demoService.runThreeSatDemo(params);
  }
}
