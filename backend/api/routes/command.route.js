import express from "express"; // importar express
import { getAllCommands, createCommand, getCommand, updateCommand, deleteCommand, getCommandsByStatus }
from "../controller/command.controller.js"; //traernos el controlador de las comandas

const router = express.Router(); //importar el router de express
//rutas con paramateros y controladores con su método HTTP
router.get("/", getAllCommands);
router.get("/:id", getCommand);
router.get("/status/:status", getCommandsByStatus);
router.post("/", createCommand);
router.put("/:id", updateCommand);
router.delete("/:id", deleteCommand);

export default router; //exportar el router