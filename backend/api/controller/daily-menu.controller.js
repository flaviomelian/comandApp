import DailyMenu from "../model/daily-menu.model.js"; //Importar el modelo del menu

export const getAllMenus = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla menus
  try {
    let menus;
    if (request.query && request.query.name) {
      menus = await DailyMenu.findAll({
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
    const menu = await DailyMenu.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos el menu en una constante con findOne()
    return response.status(200).json(menu); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const createMenu = async (request, response) => {
  //Funcion que nos crea un menu
  try {
    const menu = await DailyMenu.create(request.body); //guardamos el menu en una constante con create() y le pasamos el body de la request (la info del menu)
    return response.status(200).json(menu); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateMenu = async (request, response) => {
  //Funcion que nos actualiza un menu
  try {
    const menu = await DailyMenu.update(request.body, {
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
    const menu = await DailyMenu.destroy({
      where: { id: request.params.id },
    }); //guardamos el menu en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`Menu with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};