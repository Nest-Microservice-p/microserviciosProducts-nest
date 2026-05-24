// src/productos/entities/producto.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductoDocument = Producto & Document;
@Schema({ 
  timestamps: true,
  toJSON: {
    virtuals: true,        
    transform(doc, ret:any) {
      ret.id = ret._id;    
      delete ret._id;      
      delete ret.__v;      
    }
  }
})
export class Producto {

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  available: boolean;

}

export const ProductoSchema = SchemaFactory.createForClass(Producto);

// Equivalente al @@index([available, createdAt]) de Prisma
ProductoSchema.index({ available: 1, createdAt: 1 });