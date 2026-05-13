import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prima.service';
import { Producto } from './entities/producto.entity';
import { queryPaginator } from 'src/common/dto/dtoQuery';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductosService {
  /* export class ProductosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PrismaService');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      this.logger.error('Error al conectar a la base de datos', error);
    }
  } */
    constructor(private prisma: PrismaService) {}


  async create(createProductoDto: CreateProductoDto):Promise<{message:string,product:Producto}> {
    try {
         const newProducto= await this.prisma.producto.create({data:createProductoDto})
          return {
      message:'El producto ha sido agregado correctamente',
      product:newProducto
    };
    } catch (error) {
      console.error(error)
      throw new RpcException('Error al ingresar un nuevo producto')
    }

  }

  async findAll(query:queryPaginator) {
    const {paginator,limit,disponibles}=query

    const t=await this.prisma.producto.count({where:{available:disponibles}})

    return{Productos:await this.prisma.producto.findMany({
      skip:(paginator-1)*limit,
      take:limit,
      where:{available:disponibles}
    }),
    metadata:{
      Total:t,
      ActualPage:paginator,
      TotalPages:Math.ceil((t/limit))
    }
  }
  }

  async findOne(idProducto: number) {
    const producto=await this.prisma.producto.findFirst({
      where:{id:idProducto,available:true}
    })

    if(!producto)throw new RpcException({message:'No se ha encontrado el producto solicitado '+idProducto,
      status:HttpStatus.BAD_REQUEST
    })

     return producto
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const {id:__,...data}=updateProductoDto
    await this.findOne(id)
    const producto=await this.prisma.producto.update({where:{id},data})

    return{
      message:`El producto con id ${id}, ha sido modificado correctamente`,
      Producto:producto
    }
  }

  async remove(id: number) {

    await this.findOne(id)
    //await this.prisma.producto.delete({where:{id}})

    return {message:`El producto con id: ${id}, ha sido eliminado correctamente`,
    Producto: await this.prisma.producto.update({where:{id},data:{available:false}})
  }
  }


  async validateProductsIds(idsProducts:number[]){
    const ids=Array.from(new Set(idsProducts))
    const products= await this.prisma.producto.findMany({where:{id:{
      //in:Object.values(ids)
      in:ids
    }}})

    if(ids.length!==products.length)throw new RpcException({message:'Algunos Productos no Existen o no Estan Disponibles',status:HttpStatus.BAD_REQUEST})

      return products
  }
}
