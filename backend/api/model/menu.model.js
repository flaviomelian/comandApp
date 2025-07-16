import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const Menu = sequelize.define(
  "menu", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //Nombre del menú
    name: {
      type: DataTypes.STRING, //tipo de dato entero
    },
    //Descripción del menu
    description: {
      type: DataTypes.STRING, //tipo de dato cadena de texto
    },
    //Precio
    price: {
      type: DataTypes.DOUBLE, //tipo de dato double
      allowNull: false, //no puede ser nulo
    },
    //Esta activo o no
    active: {
      type: DataTypes.BOOLEAN, //tipo de dato booleano
    },
    //momento en el que se crea
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { updatedAt: false } //no creamos el campo updateAt
);

export default Menu; //exportar el modelo para usarlo en el controlador