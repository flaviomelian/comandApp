import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const User = sequelize.define(
  "user", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //Nombre del usuario
    name: {
      type: DataTypes.STRING, //tipo de dato cadena de texto
    },
    //rol del usuario
    rol: {
      type: DataTypes.ENUM("camarero", "cocina", "admin"), //tipo de dato enumerado
    },
    //contraseña del usuario
    password: {
      type: DataTypes.STRING, //tipo de dato cadena de texto
      allowNull: false, //no puede ser nulo
    },
    //activo del usuario
    active: {
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

export default User; //exportar el modelo para usarlo en el controlador