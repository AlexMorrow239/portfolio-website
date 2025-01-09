import { Body, Controller, Post } from '@nestjs/common';
import { DemoService } from '../services/demo.service';

@Controller('api/demos')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('python-module/run')
  async runPythonDemo(@Body() params: { integer: number; float: number }) {
    return this.demoService.runPythonDemo(params);
  }
}
