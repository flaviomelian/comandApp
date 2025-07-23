import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const ItemCommand = sequelize.define(
  "item", //nombre de la tabla
  {
    //ID
    id: {
      type: DataTypes.INTEGER, //tipo de dato entero
      primaryKey: true, //clave primaria
      autoIncrement: true, //autoincremental
      allowNull: false, //no puede ser nulo
    },
    //ID de la comanda
    commandId: {
      type: DataTypes.INTEGER, //tipo de dato entero
    },
    //Plato de la comanda
    dishId: {
      type: DataTypes.INTEGER, //tipo de dato cadena de texto
    },
    //Cantidad del plato
    amount: {
      type: DataTypes.INTEGER, //tipo de dato entero
      allowNull: false, //no puede ser nulo
      defaultValue: 0, //valor por defecto
    },
    //Estado del plato
    status: {
      type: DataTypes.ENUM("pendiente", "en concina", "servido", "cancelado"), //tipo de dato ENUM
    },
    //momento en el que se crea
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { updatedAt: false } //no creamos el campo updateAt
);

export default ItemCommand; //exportar el modelo para usarlo en el controlador