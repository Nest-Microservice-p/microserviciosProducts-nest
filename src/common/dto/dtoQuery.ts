import { Transform, Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"



export class queryPaginator{
    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    paginator:number=1

    @IsOptional()
    @Transform(({ value }) =>
      typeof value === 'boolean'
        ? value
        : !(value === 'false')
    )
    disponibles:boolean=true

    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    limit:number=10
}