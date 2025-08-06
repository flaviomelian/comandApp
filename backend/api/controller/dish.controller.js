import Dish from "../model/dish.model.js"; //Importar el modelo del usuario

export const getAllDishes = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla platos
  try {
    const dishes = await Dish.findAll(); //guardamos todos los platos en una constante con findAll()
    return response.status(200).json(dishes); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getAllDishesByMenu = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla platos por menu
  try {
    let dishes;
    if (request.params && request.params.id) {
      dishes = await Dish.findAll({
        where: {
          menuId: request.params.id,
        },
      }); //guardamos todos los platos en una constante con findAll()
    }
    return response.status(200).json(dishes); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getDish = async (request, response) => {
  //Funcion que nos devuelve un usuario
  try {
    const dish = await Dish.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos el usuario en una constante con findOne()
    return response.status(200).json(dish); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const createDish = async (request, response) => {
  //Funcion que nos crea un usuario
  try {
    const dish = await Dish.create(request.body); //guardamos el usuario en una constante con create() y le pasamos el body de la request (la info del usuario)
    return response.status(200).json(dish); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateDish = async (request, response) => {
  //Funcion que nos actualiza un usuario
  try {
    const dish = await Dish.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos el plato en una constante con update() y le pasamos el body de la request (la info del usuario), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(dish); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteDish = async (request, response) => {
  //Funcion que nos elimina un plato
  try {
    const dish = await Dish.destroy({
      where: { id: request.params.id },
    }); //guardamos el usuario en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`Dish with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};