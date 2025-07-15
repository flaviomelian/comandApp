import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const Dish = sequelize.define(
  "dishes", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //Nombre del plato
    name: {
      type: DataTypes.STRING, //tipo de dato entero
    },
    //Descripción del plato
    description: {
      type: DataTypes.STRING, //tipo de dato cadena de texto
    },
    //Precio del plato
    price: {
      type: DataTypes.FLOAT, //tipo de dato flotante
      allowNull: false, //no puede ser nulo
      defaultValue: 0.0, //valor por defecto
    },
    //Categoría del plato
    category: {
      type: DataTypes.ENUM("entrante", "principal", "postre", "bebida"), //tipo de dato ENUM
    },
    //Disponibilidad del plato
    available: {
      type: DataTypes.BOOLEAN, //tipo de dato booleano
      defaultValue: true, //valor por defecto
    },
    //momento en el que se crea
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { updatedAt: false } //no creamos el campo updateAt
);

export default Dish; //exportar el modelo para usarlo en el controlador