import express from "express"; // importar express
const router = express.Router(); //importar el router de express

// Importar los routers de las diferentes rutas
import userRouter from "./user.route.js"; //importar el router de los usuarios
import dishRouter from "./dish.route.js"; //importar el router de los platos
import menuRouter from "./menu.route.js"; //importar el router de los menús
import commandRouter from "./command.route.js"; //importar el router de las comandas
import itemCommandRouter from "./item-command.route.js"; //importar el router de los items de la comanda
import tableRouter from "./table.route.js"; //importar el router de las mesas

// Asignar los routers a las rutas correspondientes
router.use("/users", userRouter); //asignamos al router principal el de los usuarios al acceder al endpoint /
router.use("/dishes", dishRouter); //asignamos al router principal el de los platos
router.use("/menus", menuRouter); //asignamos al router principal el de los menús
router.use("/commands", commandRouter); //asignamos al router principal el de los usuarios al acceder al endpoint /
router.use("/dishes", dishRouter); //asignamos al router principal el de los platos
router.use("/item-command", itemCommandRouter); //asignamos al router principal el de los platos
router.use("/table", tableRouter); //asignamos al router principal el de los platos
export default router; //exportar el router principal