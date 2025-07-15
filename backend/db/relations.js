import Dish from "../api/model/dish.model.js";
import Menu from "../api/model/menu.model.js";
import Table from "../api/model/table.model.js";
import Command from "../api/model/command.model.js";
import ItemCommand from "../api/model/item-command.model.js";
import User from "../api/model/user.model.js";

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

    console.log("✅ Relaciones correctamente añadidas.");
  } catch (error) {
    console.error("❌ Error al inicializar relaciones:", error);
  }
};