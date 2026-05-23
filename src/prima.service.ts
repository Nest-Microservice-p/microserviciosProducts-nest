
import { Injectable, Logger } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { envs } from './config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

  logger=new Logger('Database')
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url:envs.DATABASE_URL });
    super({ adapter });
    this.logger.log('Base de Datos Inicializada Correctamente')
  }

}
