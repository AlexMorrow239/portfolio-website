import {
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Technologies used in the project',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @ApiProperty({
    description: 'Skills used in the project',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @ApiPropertyOptional({
    description: 'Project image URL',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether the project is featured',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the project is visible',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  visible?: boolean;

  @ApiPropertyOptional({
    description: 'Project performance metrics',
    example: {
      response_time: '100ms',
      uptime: '99.9%',
    },
  })
  @IsObject()
  @IsOptional()
  metrics?: {
    [key: string]: string;
  };

  @ApiPropertyOptional({
    description: 'Project links',
    example: {
      github: 'https://github.com/user/project',
      live: 'https://project.com',
      documentation: 'https://docs.project.com',
    },
  })
  @IsObject()
  @IsOptional()
  links?: {
    github?: string;
    live?: string;
    documentation?: string;
  };
}
