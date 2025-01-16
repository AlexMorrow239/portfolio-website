import { Controller, Post, Body, Logger } from '@nestjs/common';
import { DemosService } from './demos.service';
import { RunSatSolverDto } from './dto/run-sat-solver.dto';

@Controller('demos')
export class DemosController {
  private readonly logger = new Logger(DemosController.name);

  constructor(private readonly demosService: DemosService) {}

  @Post('three-sat/run')
  async runSatSolver(@Body() dto: RunSatSolverDto) {
    this.logger.debug('Received SAT solver request:', dto);
    return this.demosService.runSatSolver(dto);
  }
}
