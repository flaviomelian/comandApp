import e from "express";
import { Sequelize } from "sequelize";
//importar sequelize y las funciones que nos conectan a la base de datos
import dotenv from "dotenv";
const env = dotenv.config();

//conexion a la base de datos
export const sequelize = new Sequelize(env.parsed.DB_NAME, env.parsed.DB_USER, env.parsed.DB_USER, {
  host: env.parsed.DB_HOST,
  dialect: env.parsed.DB_DIALECT,
  port: env.parsed.DB_PORT,
  logging: false,
});

//funcion que se encarga de establecer la conexion:
export const checkConnection = async () => {
  try {
    await sequelize.authenticate(); //metodo de sequelize que te conecta a la base de datos
    console.log("entro");
  } catch (error) {
    console.error(error);
  }
};

//configuracion para poder crear los modelos:
//manejo de la creacion y actualizacion de los modelos:
export const syncModels = async () => {
  try {
    await sequelize.sync(); //actualizamos las tablas con sync de sequelize
  } catch (error) {
    console.error(error);
  }
};