import Dish from "../api/model/dish.model.js";
import Menu from "../api/model/menu.model.js";
import Table from "../api/model/table.model.js";
import Command from "../api/model/command.model.js";
import ItemCommand from "../api/model/item-command.model.js";
import User from "../api/model/user.model.js";
import DailyMenu from "../api/model/daily-menu.model.js"; // Importar el modelo del menú del día

export const initializeRelations = () => {
  try {
    // MESA - COMANDA
    Table.hasMany(Command);
    Command.belongsTo(Table);

    // MENU - PLATO
    Menu.hasMany(Dish);
    Dish.belongsTo(Menu);

    // COMANDA - ITEM
    Command.hasMany(ItemCommand);
    ItemCommand.belongsTo(Command);

    // PLATO - ITEM
    Dish.hasMany(ItemCommand);
    ItemCommand.belongsTo(Dish);

    // USUARIO - COMANDA
    User.hasMany(Command);
    Command.belongsTo(User);

    // MENU - MENÚ DEL DÍA
    DailyMenu.belongsTo(Menu, { as: "base", foreignKey: "menuBaseId" })
    Menu.hasMany(DailyMenu, { foreignKey: "menuBaseId" })

    // MENÚ DEL DÍA - PLATO
    DailyMenu.belongsToMany(Dish, { through: "dishes_daily-menu" })
    Dish.belongsToMany(DailyMenu, { through: "dishes_daily-menu" })

    console.log("✅ Relaciones correctamente añadidas.");
  } catch (error) {
    console.error("❌ Error al inicializar relaciones:", error);
  }
};