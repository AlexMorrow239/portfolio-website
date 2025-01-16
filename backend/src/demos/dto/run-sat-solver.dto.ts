import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class RunSatSolverDto {
  @IsInt()
  @Min(3)
  @Max(5)
  n: number;

  @IsNumber()
  @Min(2.0)
  @Max(5.0)
  ratio: number;
}
