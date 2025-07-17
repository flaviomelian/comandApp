import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const Command = sequelize.define(
  "commands", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //Estado de la comanda
    status: {
      type: DataTypes.ENUM("en preparación", "servida", "cancelada"), //tipo de dato ENUM
    },
    //Observaciones de la comanda
    observations: {
      type: DataTypes.STRING, //tipo de dato cadena de texto
    },
    //momento en el que se crea
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { updatedAt: false } //no creamos el campo updateAt
);

export default Command; //exportar el modelo para usarlo en el controlador