import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { queryPaginator } from 'src/common/dto/dtoQuery';
import { Producto, ProductoDocument } from './entities/products.schema';

@Injectable()
export class ProductosService {

  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<ProductoDocument>
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const newProducto = await this.productoModel.create(createProductoDto);
      return {
        message: 'El producto ha sido agregado correctamente',
        product: newProducto,
      };
    } catch (error) {
      console.error(error);
      throw new RpcException('Error al ingresar un nuevo producto');
    }
  }

  async findAll(query: queryPaginator) {
    const { paginator, limit, disponibles } = query;

    const total = await this.productoModel.countDocuments({ available: disponibles });

    const productos = await this.productoModel
      .find({ available: disponibles })
      .skip((paginator - 1) * limit)
      .limit(limit);

    return {
      Productos: productos,
      metadata: {
        Total: total,
        ActualPage: paginator,
        TotalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const producto = await this.productoModel.findOne({
      _id: id,
      available: true,
    });

    if (!producto) throw new RpcException({
      message: `No se ha encontrado el producto solicitado ${id}`,
      status: HttpStatus.BAD_REQUEST,
    });

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const { id: __, ...data } = updateProductoDto;
    await this.findOne(id);

    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      data,
      { new: true }, // retorna el documento actualizado
    );

    return {
      message: `El producto con id ${id} ha sido modificado correctamente`,
      Producto: producto,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      { available: false },
      { new: true },
    );

    return {
      message: `El producto con id ${id} ha sido eliminado correctamente`,
      Producto: producto,
    };
  }

  async validateProductsIds(idsProducts: string[]) {
    const ids = Array.from(new Set(idsProducts));

    const products = await this.productoModel.find({
      _id: { $in: ids },
      available: true,
    });

    if (ids.length !== products.length) throw new RpcException({
      message: 'Algunos Productos no Existen o no Están Disponibles',
      status: HttpStatus.BAD_REQUEST,
    });

    return products;
  }
}