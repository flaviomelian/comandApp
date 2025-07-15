import { DataTypes } from "sequelize"; //importar sequelize
import { sequelize } from "../../db/index.js"; //importar las funciones que nos conectan a la base de datos

const DailyMenu = sequelize.define("daily-menu", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true, // Solo uno por día
  },
  menuBaseId: {
    type: DataTypes.INTEGER,
    references: {
      model: "menus",
      key: "id",
    },
  },
  customDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  updatedAt: false,
  createdAt: true,
});

export default DailyMenu;