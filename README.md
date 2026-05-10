API de Productos - Microservicio con NestJS
<p align="center"> <a href="https://nestjs.com/" target="_blank"> <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /> </a> </p> <p align="center"> Microservicio desarrollado con NestJS para la gestión de productos utilizando Prisma ORM y SQLite. </p>
Introducción

Este proyecto es un microservicio construido con NestJS enfocado en la gestión de productos mediante operaciones CRUD.

El sistema implementa:

Arquitectura modular
Validación de datos
Paginación
Filtros dinámicos
Variables de entorno
ORM tipado
Manejo de excepciones HTTP

El proyecto utiliza Prisma ORM para el acceso a base de datos y SQLite como motor de almacenamiento.

Tecnologías utilizadas
NestJS
TypeScript
Prisma ORM
SQLite
Joi
Class Validator
Class Transformer
¿Qué es NestJS?

NestJS es un framework backend para Node.js basado en TypeScript.

Su objetivo es facilitar el desarrollo de aplicaciones escalables y mantenibles utilizando:

Inyección de dependencias
Arquitectura modular
Programación orientada a objetos
Decoradores
Controladores y servicios

NestJS está inspirado en Angular, pero enfocado al desarrollo backend.

Estructura del proyecto
src/
│
├── productos/
│   ├── dto/
│   ├── entities/
│   ├── productos.controller.ts
│   ├── productos.service.ts
│   └── productos.module.ts
│
├── common/
│   └── dto/
│
├── config/
│
├── prisma.service.ts
│
└── main.ts
Dependencias principales
Prisma ORM

Prisma es el ORM utilizado para conectarse y trabajar con la base de datos.

Permite:

Consultas tipadas
Migraciones
Autocompletado
Validación de esquemas
Mejor experiencia de desarrollo
Instalación
npm install prisma @prisma/client
Inicialización
npx prisma init
Crear migración
npx prisma migrate dev --name init
SQLite

SQLite es una base de datos ligera que funciona mediante archivos locales.

Ventajas:

No requiere servidor
Fácil configuración
Ideal para pruebas y proyectos pequeños

Configuración:

DATABASE_URL="file:./dev.db"
Joi

Joi se utiliza para validar variables de entorno y configuraciones.

Ejemplo:

const envSchema = joi.object({
  PORT: joi.number().required(),
}).unknown(true)
Instalación
npm install joi
Class Validator

Permite validar DTOs mediante decoradores.

Ejemplo:

@IsString()
@MinLength(3)
name:string
Instalación
npm install class-validator
Class Transformer

Transforma automáticamente datos provenientes de requests HTTP.

Ejemplo:

@Type(() => Number)
page:number
Instalación
npm install class-transformer
Instalación del proyecto
Clonar repositorio
git clone URL_DEL_REPOSITORIO
Entrar al proyecto
cd productos
Instalar dependencias
npm install
Variables de entorno

Crear un archivo .env:

PORT=3003
DATABASE_URL="file:./dev.db"
Ejecutar el proyecto
Desarrollo
npm run start:dev
Producción
npm run start:prod
Endpoints principales
Obtener productos
GET /productos
Obtener productos disponibles
GET /productos?disponibles=true
Paginación
GET /productos?paginator=1&limit=10
Obtener producto por ID
GET /productos/1
Crear producto
POST /productos
Actualizar producto
PATCH /productos/1
Eliminar producto
DELETE /productos/1
Funcionalidades implementadas
CRUD completo
Paginación
Filtros dinámicos
Validación de DTOs
Manejo de excepciones HTTP
Variables de entorno
Prisma ORM
SQLite
Arquitectura modular
Comandos útiles
Ejecutar migraciones
npx prisma migrate dev
Abrir Prisma Studio
npx prisma studio
Regenerar cliente Prisma
npx prisma generate
Ejemplo de respuesta paginada
{
  "Productos": [],
  "metadata": {
    "Total": 50,
    "ActualPage": 1,
    "TotalPages": 5
  }
}
Autor

Cristian Jesus David Ake

Licencia

Proyecto desarrollado con fines educativos utilizando licencia MIT.
