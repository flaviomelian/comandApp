import ItemCommand from "../model/item-command.model.js"; //Importar el modelo dla comanda

export const getAllItemCommands = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla comandas
  try {
    let itemCommands;
    if (request.query && request.query.name) {
      itemCommands = await ItemCommand.findAll({
        where: {
          name: request.query.name,
        },
      }); //guardamos todas las comandas en una constante con findAll()
    }
    return response.status(200).json(itemCommands); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    console.error("Error fetching all item commands:", error);
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getItemCommand = async (request, response) => {
  //Funcion que nos devuelve una comanda
  try {
    const itemCommand = await ItemCommand.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos la comanda en una constante con findOne()
    return response.status(200).json(itemCommand); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getAllItemsByCommand = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla items filtradas por id de comanda
  console.log("Fetching items for command ID:", request.params.id);
  try {
    const items = await ItemCommand.findAll({
      where: {
        commandId: request.params.id, //filtrar por id de comanda
      },
    }); //guardamos todos los items en una constante con findAll()
    if (items.length === 0) 
      return response.status(404).json({ error: "No items found for this command" });
    return response.status(200).json(items); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    console.error("Error fetching items by command ID:", error);
    return response.status(500).send(error); //en caso de error, devolvemos el codigo de error y enviamos el mensaje de error
  }
};

export const createItemCommand = async (request, response) => {
  //Funcion que nos crea una comanda
  try {
    console.log("Creating item command with data:", request.body);
    const itemCommand = await ItemCommand.create(request.body); //guardamos la comanda en una constante con create() y le pasamos el body de la request (la info dla comanda)
    return response.status(200).json(itemCommand); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    console.error("Error creating item commands:", error);
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateItemCommand = async (request, response) => {
  //Funcion que nos actualiza una comanda
  try {
    const itemCommand = await ItemCommand.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos la comanda en una constante con update() y le pasamos el body de la request (la info de la comanda), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(itemCommand); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteItemCommand = async (request, response) => {
  //Funcion que nos elimina una comanda
  try {
    const ItemCommand = await ItemCommand.destroy({
      where: { id: request.params.id },
    }); //guardamos la comanda en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`ItemCommand with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};