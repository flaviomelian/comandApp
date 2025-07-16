import express from "express"; // importar express
import { getAllMenus, createMenu, getMenu, updateMenu, deleteMenu, getMenusByDay }
from "../controller/menu.controller.js"; //traernos el controlador de las comandas

const router = express.Router(); //importar el router de express
//rutas con paramateros y controladores con su método HTTP
router.get("/", getAllMenus);
router.get("/day/:day", getMenusByDay);
router.get("/:id", getMenu);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router; //exportar el router