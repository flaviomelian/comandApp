import User from "../model/user.model.js"; //Importar el modelo del usuario

export const getAllUsers = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla usuarios
  try {
    let users;
    if (request.query && request.query.name) {
      users = await User.findAll({
        where: {
          name: request.query.name,
        },
      }); //guardamos todos los usuarios en una constante con findAll()
    }
    return response.status(200).json(users); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getUser = async (request, response) => {
  //Funcion que nos devuelve un usuario
  try {
    const user = await User.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos el usuario en una constante con findOne()
    return response.status(200).json(users); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const createUser = async (request, response) => {
  //Funcion que nos crea un usuario
  try {
    const user = await User.create(request.body); //guardamos el usuario en una constante con create() y le pasamos el body de la request (la info del usuario)
    return response.status(200).json(user); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateUser = async (request, response) => {
  //Funcion que nos actualiza un usuario
  try {
    const user = await User.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos el usuario en una constante con update() y le pasamos el body de la request (la info del usuario), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(user); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteUser = async (request, response) => {
  //Funcion que nos elimina un usuario
  try {
    const user = await User.destroy({
      where: { id: request.params.id },
    }); //guardamos el usuario en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`User with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(501).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};