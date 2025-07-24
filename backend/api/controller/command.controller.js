import Command from "../model/command.model.js"; //Importar el modelo de la comanda

export const getAllCommands = async (request, response) => {
  //Funcion que nos devuelve todas las filas de la tabla comandas
  try {
    let commands;
    commands = await Command.findAll(); //guardamos todas las comandas en una constante con findAll()
    return response.status(200).json(commands); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const getCommandsByStatus = async (request, response) => {
  try {
    const commands = await Command.findAll({
      where: {
        status: request.params.status, // Filtrar por estado
      },
    });
    if (commands.length === 0) throw new Error("No commands found with the given status");
    return response.status(200).json(commands); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    console.error("Error in getCommandsByStatus:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}

export const getCommand = async (request, response) => {
  //Funcion que nos devuelve una comanda
  try {
    const command = await Command.findOne({
      where: {
        id: request.params.id, //filtrar por id
      },
    }); //guardamos la comanda en una constante con findOne()
    return response.status(200).json(command); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const createCommand = async (request, response) => {
  //Funcion que nos crea una comanda
  try {
    const command = await Command.create(request.body); //guardamos la comanda en una constante con create() y le pasamos el body de la request (la info dla comanda)
    return response.status(200).json(command); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const updateCommand = async (request, response) => {
  //Funcion que nos actualiza una comanda
  try {
    const command = await Command.update(request.body, {
      where: { id: request.params.id },
    }); //guardamos la comanda en una constante con update() y le pasamos el body de la request (la info de la comanda), usamos su id para filtar el que se quiere actualizar
    return response.status(200).json(command); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};

export const deleteCommand = async (request, response) => {
  //Funcion que nos elimina una comanda
  try {
    const command = await Command.destroy({
      where: { id: request.params.id },
    }); //guardamos la comanda en una constante con destroy() y usamos su id para filtar el que se quiere eliminar
    return response
      .status(200)
      .send(`Command with id: ${request.params.id} deleted`); //devolvemos el codigo de OK y la respuesta en formato json
  } catch (error) {
    return response.status(500).send(error); //en caso de error, devolemos el codigo de error y enviamos el mensaje de error
  }
};