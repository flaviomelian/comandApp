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
        return response.data; // Ensure this returns the created command with an id
    } catch (error) {
        console.error("Error in createCommand:", error);
        throw error;
    }
};

export const getCommands = async () => {
    try {
        console.log("Fetching commands...");
        const response = await api.get('commands');
        console.log("Response from getCommands:", response);
        if (response.status !== 200) throw new Error("Error fetching commands");
        return response.data;
    } catch (error) {
        console.error("Error in getCommands:", error);
        throw error;
    }
};    

export const getCommandsByStatus = async (status: string) => {
    try {
        console.log("Fetching commands by status:", status);
        const response = await api.get(`commands/status/${status}`);
        console.log("Response from getCommands:", response);
        if (response.status !== 200) throw new Error("Error fetching commands");
        return response.data;
    } catch (error) {
        console.error("Error in getCommands:", error);
        throw error;
    }
}; 