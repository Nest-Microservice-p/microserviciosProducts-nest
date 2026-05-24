import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { envs } from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
 imports: [
    MongooseModule.forRoot(envs.DATABASE_URL),
    ProductosModule,
  ],  controllers: [],
  providers: [],
})
export class AppModule {}
