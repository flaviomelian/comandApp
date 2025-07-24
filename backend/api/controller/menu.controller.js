import Menu from "../model/menu.model.js"; //Importar el modelo del menu
import { Op } from "sequelize"; //Importar el operador Op de sequelize

//Controladores para las rutas de los menús

export const getAllMenus = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla menus
  try {
    let menus;
    if (request.query && request.query.name) {
      menus = await Menu.findAll({
        where: {
          name: request.query.name,
        },
      }); //guardamos todos los menus en una constante con findAll()
    }
    return response.status(200).json(menus); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getMenu = async (request, response) => {
  //Funcion que nos devuelve un menu
  try {
    const menu = await Menu.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos el menu en una constante con findOne()
    return response.status(200).json(menu); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getMenuByName = async (request, response) => {
  try {
    const { name } = request.query; // Obtenemos el nombre del menú desde los parámetros de la solicitud

    if (!name) return response.status(400).json({ error: "Missing 'name' in request body" });
    
    const decodedName = decodeURIComponent(name);
    console.log("Decoded name:", decodedName);

    const menu = await Menu.findOne({
      where: {
        description: decodedName,
      },
    });

    if (!menu) return response.status(404).json({ error: "Menu not found" });
    console.log("Menu found:", menu);
    return response.status(200).json(menu);
  } catch (error) {
    console.error("Error in getMenuByName:", error);
    return response.status(500).send(error);
  }
};


export const getMenusByDay = async (req, res) => {
  const dayParam = decodeURIComponent(req.params.day);
  if (!dayParam) return res.status(400).json({ message: "Día no especificado" });
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const day = days[dayParam]
  console.log("dayParam (raw):", req.params.day);
console.log("dayParam (decoded):", dayParam);
console.log("Day resolved:", day);

  console.log("Buscando menús para el día:", day);
  try {
    const dailyMenus = await Menu.findAll({
      where: {
        name: {
          [Op.like]: `%${day}%`
        }
      }
    });

    if (dailyMenus.length === 0) return res.status(404).json({ message: `No hay menús para el día: ${day}` });
    return res.status(200).json(dailyMenus);
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const createMenu = async (request, response) => {
  //Funcion que nos crea un menu
  try {
    const menu = await Menu.create(request.body); //guardamos el menu en una constante con create() y le pasamos el body de la request (la info del menu)
    return response.status(200).json(menu); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateMenu = async (request, response) => {
  //Funcion que nos actualiza un menu
  try {
    const menu = await Menu.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos el menu en una constante con update() y le pasamos el body de la request (la info del menu), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(menu); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteMenu = async (request, response) => {
  //Funcion que nos elimina un menu
  try {
    const menu = await Menu.destroy({
      where: { id: request.params.id },
    }); //guardamos el menu en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`Menu with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};