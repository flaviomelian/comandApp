import api from "./index";

interface Command {
    tableId: number;
    status: string;
    observations: string;
    // add other properties if needed
}

export const createCommand = async (commandData: Command) => {
    try {
        console.log("Creating command with data:", commandData);
        const response = await api.post('commands', commandData);
        if (response.status !== 200) throw new Error("Error creating command");
    } catch (error) {
        console.error("Error in createCommand:", error);
        throw error;
    }
};

export const getCommands = async () => {
    try {
        const response = await api.get('commands');
        if (response.status !== 200) throw new Error("Error fetching commands");
        return response.data;
    } catch (error) {
        console.error("Error in getCommands:", error);
        throw error;
    }
};    