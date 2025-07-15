import express from "express"; // importar express
import { getAllItemCommands, createItemCommand, getItemCommand, updateItemCommand, deleteItemCommand }
from "../controller/item-command.controller.js"; //traernos el controlador de las comandas

const router = express.Router(); //importar el router de express
//rutas con paramateros y controladores con su método HTTP
router.get("/", getAllItemCommands);
router.get("/:id", getItemCommand);
router.post("/", createItemCommand);
router.put("/:id", updateItemCommand);
router.delete("/:id", deleteItemCommand);

export default router; //exportar el router