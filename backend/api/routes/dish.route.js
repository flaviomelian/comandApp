import express from "express"; // importar express
import { getAllDishes, createDish, getDish, updateDish, deleteDish, getAllDishesByMenu }
from "../controller/dish.controller.js"; //traernos el controlador de las comandas

const router = express.Router(); //importar el router de express
//rutas con paramateros y controladores con su método HTTP
router.get("/", getAllDishes);
router.get("/menu/:id", getAllDishesByMenu);
router.get("/:id", getDish);
router.post("/", createDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router; //exportar el router