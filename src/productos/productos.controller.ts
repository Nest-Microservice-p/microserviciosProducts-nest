import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { queryPaginator } from 'src/common/dto/dtoQuery';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //@Post()
  @MessagePattern({cmd:'createProduct'})
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  //@Get()
  @MessagePattern({cmd:'productAll'})
  findAll(@Payload() query:queryPaginator) {
    return this.productosService.findAll(query);
  }

  //@Get(':id')
  @MessagePattern({cmd:'getOne'})
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'updateProduct'})
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'deleteProduct'})
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }

  @MessagePattern({cmd:'validateProducts'})
  validateProductos(@Payload() idsProducts:number[]){
    return this.productosService.validateProductsIds(idsProducts)
  }



}
