import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageFactory, StorageService } from '../media/storage.factory';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  private storageService: StorageService;

  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private storageFactory: StorageFactory,
  ) {
    this.storageService = this.storageFactory.getStorageService();
  }

  async create(
    createProjectDto: CreateProjectDto,
    file?: Express.Multer.File,
  ): Promise<Project> {
    try {
      let imageUrl: string | undefined;

      if (file) {
        imageUrl = await this.storageService.uploadImage(file);
      }

      const project = new this.projectModel({
        ...createProjectDto,
        imageUrl,
      });

      return project.save();
    } catch (error) {
      console.error('Service Create - Error:', error.message, error.stack);
      throw new BadRequestException(
        'Failed to create project. Please try again later.',
      );
    }
  }

  async findAll(includeHidden: boolean = false): Promise<Project[]> {
    // If includeHidden is true, return all projects, otherwise only return visible ones
    const query = includeHidden ? {} : { visible: true };
    return this.projectModel.find(query).exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    file?: Express.Multer.File,
    removeImage?: boolean,
  ): Promise<Project> {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      // Handle image updates
      if (removeImage && project.imageUrl) {
        await this.storageService.deleteImage(project.imageUrl);
        updateProjectDto.imageUrl = null;
      } else if (file) {
        if (project.imageUrl) {
          await this.storageService.deleteImage(project.imageUrl);
        }
        const imageUrl = await this.storageService.uploadImage(file);
        updateProjectDto.imageUrl = imageUrl;
      }

      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        { $set: updateProjectDto },
        { new: true },
      );

      if (!updatedProject) {
        throw new NotFoundException('Project not found');
      }

      return updatedProject;
    } catch (error) {
      console.error('Service Update - Error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to update project. Please try again later.',
      );
    }
  }

  async remove(id: string): Promise<Project> {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Delete the image from storage if it exists
    if (project.imageUrl) {
      await this.storageService.deleteImage(project.imageUrl);
    }
    return project;
  }
}
