import router from "./api/routes/index.js"; // importar el router principal
import { initializeRelations } from "./db/relations.js";
import { checkConnection, sequelize, syncModels } from "./db/index.js";//importar las funciones que nos conectan a la DB
import express, { json } from "express"; //importar express
import cors from "cors"; //importar cors
import morgan from "morgan"; //importar morgan
const port = 3001; //puerto que estara en uso

const checkAndSync = async () => {
  //comprobar la conexion y sincronizar los modelos
  await checkConnection(); //comprobar conexion
  initializeRelations(); //inicializar las relaciones entre los modelos
  await syncModels(); //sincronizacion de los modelos
};

const initializeAndListen = () => {
  //Configurar express y ponerlo a escuchar en el puerto definido
  express()
    .use(morgan("dev"))
    .use(cors({ origin: 'http://localhost:3000' })) // <-- CORS antes del router
    .use(json())
    .use("/api", router)
    .listen(port, () => {
      console.log(`Listening at port: ${port}`);
    });
};

const startAPI = async () => {
  await checkAndSync(); //llamada a la funcion que maneja la conexion a la base de datos
  initializeAndListen(); //llamada a la funcion que configura expres y levanta el servidor
};

startAPI(); //Iniciamos la API