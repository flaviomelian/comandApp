import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const Table = sequelize.define(
  "table", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //Número de la mesa
    number: {
      type: DataTypes.INTEGER, //tipo de dato entero
    },
    //Estado de la mesa
    status: {
      type: DataTypes.ENUM("libre", "ocupada", "reservada"), //tipo de dato enumerado
      defaultValue: "libre", //valor por defecto
    },
    //Capacidad de la mesa
    capacity: {
      type: DataTypes.INTEGER, //tipo de dato entero
      allowNull: false, //no puede ser nulo
      defaultValue: 4, //valor por defecto
    },
    //Ubicación de la mesa
    location: {
      type: DataTypes.ENUM("interior", "terraza"), //tipo de dato cadena de texto
      allowNull: false, //no puede ser nulo
    },
    //momento en el que se crea
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { updatedAt: false } //no creamos el campo updateAt
);

export default Table; //exportar el modelo para usarlo en el controlador