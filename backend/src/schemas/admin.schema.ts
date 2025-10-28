import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  verifyOtp?: string;

  @Prop({ default: 0 })
  verifyOtpExpireAt?: number;

  @Prop({ default: false })
  isVerified?: boolean;

  @Prop({ default: false })
  isApproved?: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
