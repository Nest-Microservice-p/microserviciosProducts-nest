import 'dotenv/config'
import * as joi from 'joi'

interface envsVarsInterface{
    PORT:number
    DATABASE_URL:string
}

    const envSchema=joi.object({
        PORT:joi.number().required(),
        DATABASE_URL:joi.string().required()
    }).unknown(true)

    const {error,value}=envSchema.validate(process.env)

    if(error)throw new Error('Error en la Validacion de la Configuracion: ' +error.message )

    const envsVars=value as envsVarsInterface
export const envs={
PORT:envsVars.PORT,
DATABASE_URL:envsVars.DATABASE_URL
}