import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsString, IsPositive } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsString()
    @IsPositive()
    id:string
}
