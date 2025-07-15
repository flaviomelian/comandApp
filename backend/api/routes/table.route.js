import express from "express"; // importar express
import { getAllTables, createTable, getTable, updateTable, deleteTable }
from "../controller/table.controller.js"; //traernos el controlador de las comandas

const router = express.Router(); //importar el router de express
//rutas con paramateros y controladores con su método HTTP
router.get("/", getAllTables);
router.get("/:id", getTable);
router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router; //exportar el router