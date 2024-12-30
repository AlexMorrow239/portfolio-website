import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all visible projects' })
  async findAll(): Promise<Project[]> {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      console.error('Error retrieving projects:', error.message);
      throw new BadRequestException('Failed to retrieve projects');
    }
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects (including hidden) for admin' })
  async findAllAdmin(): Promise<Project[]> {
    try {
      return await this.projectsService.findAll(true);
    } catch (error) {
      console.error('Error retrieving projects:', error.message);
      throw new BadRequestException('Failed to retrieve projects');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  async findOne(@Param('id') id: string): Promise<Project> {
    try {
      return await this.projectsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve project');
    }
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create new project with optional image' })
  async create(
    @Body() rawBody: any,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Project> {
    try {
      let technologies: string[];
      let skills: string[]; // Add this line

      try {
        technologies = JSON.parse(rawBody.technologies);
        skills = JSON.parse(rawBody.skills); // Add this line
      } catch {
        technologies = rawBody.technologies
          .split(',')
          .map((tech) => tech.trim());
        skills = rawBody.skills // Add these lines
          .split(',')
          .map((skill) => skill.trim());
      }

      const createProjectDto: CreateProjectDto = {
        title: rawBody.title,
        description: rawBody.description,
        technologies: technologies,
        skills: skills, // Add this line
        featured: rawBody.featured === 'true',
        visible: rawBody.visible === 'true',
        links: rawBody.links ? JSON.parse(rawBody.links) : undefined,
      };

      return await this.projectsService.create(createProjectDto, file);
    } catch (error) {
      console.error('Error creating project:', error.message);
      throw new BadRequestException('Failed to create project');
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() rawBody: any,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Project> {
    try {
      console.log('Update project request:', {
        id,
        rawBody,
        hasFile: !!file,
      });

      let technologies: string[];
      let skills: string[];

      // If we're just updating visibility, skip the parsing of technologies and skills
      if (Object.keys(rawBody).length === 1 && 'visible' in rawBody) {
        const updateProjectDto: UpdateProjectDto = {
          visible: rawBody.visible,
        };
        console.log('Updating visibility only:', updateProjectDto);
        return await this.projectsService.update(id, updateProjectDto);
      }

      try {
        if (rawBody.technologies) {
          technologies = JSON.parse(rawBody.technologies);
        }
        if (rawBody.skills) {
          skills = JSON.parse(rawBody.skills);
        }
      } catch {
        if (rawBody.technologies) {
          technologies = rawBody.technologies
            .split(',')
            .map((tech) => tech.trim());
        }
        if (rawBody.skills) {
          skills = rawBody.skills.split(',').map((skill) => skill.trim());
        }
      }

      const updateProjectDto: UpdateProjectDto = {
        title: rawBody.title,
        description: rawBody.description,
        technologies: technologies,
        skills: skills,
        featured: rawBody.featured === 'true',
        visible: rawBody.visible === 'true',
        links: rawBody.links ? JSON.parse(rawBody.links) : undefined,
      };

      return await this.projectsService.update(id, updateProjectDto, file);
    } catch (error) {
      console.error('Error updating project:', error.message);
      throw new BadRequestException('Failed to update project');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete project' })
  async remove(@Param('id') id: string): Promise<Project> {
    try {
      return await this.projectsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete project');
    }
  }
}
