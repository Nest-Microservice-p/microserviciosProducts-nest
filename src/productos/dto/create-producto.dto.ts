import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
   public name:string

   @IsNumber({
    maxDecimalPlaces:2,
   })
   @Min(0)
   @Type(()=>Number)
   public price:number
}
