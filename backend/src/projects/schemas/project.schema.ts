import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  technologies: string[];

  @Prop([String])
  skills: string[];

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  visible: boolean;

  @Prop({ type: Object })
  metrics: {
    [key: string]: string;
  };

  @Prop({ type: Object })
  links: {
    github?: string;
    live?: string;
    documentation?: string;
  };
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
