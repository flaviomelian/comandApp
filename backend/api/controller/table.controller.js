import Table from "../model/table.model.js"; //Importar el modelo del mesa

export const getAllTables = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla mesas
  try {
    let tables;
    if (request.query && request.query.name) {
      tables = await Table.findAll({
        where: {
          name: request.query.name,
        },
      }); //guardamos todas las mesas en una constante con findAll()
    } else tables = await Table.findAll();
    console.log("Tables fetched successfully:", tables);
    return response.status(200).json(tables); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getTable = async (request, response) => {
  //Funcion que nos devuelve una mesa
  try {
    const table = await Table.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos la mesa en una constante con findOne()
    return response.status(200).json(table); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getTablesByStatus = async (request, response) => {
  try {
    const tables = await Table.findAll({
      where: {
        status: request.params.status,
      },
    });
    return response.status(200).json(tables);
  } catch (error) {
    return response.status(500).send(error);
  }
};

export const createTable = async (request, response) => {
  //Funcion que nos crea una mesa
  try {
    const table = await Table.create(request.body); //guardamos la mesa en una constante con create() y le pasamos el body de la request (la info del mesa)
    return response.status(200).json(table); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateTable = async (request, response) => {
  //Funcion que nos actualiza un mesa
  try {
    const table = await Table.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos el mesa en una constante con update() y le pasamos el body de la request (la info de la mesa), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(table); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteTable = async (request, response) => {
  //Funcion que nos elimina un mesa
  try {
    const table = await Table.destroy({
      where: { id: request.params.id },
    }); //guardamos el mesa en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`Table with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};