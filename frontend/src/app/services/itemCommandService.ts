import api from "./index";

interface Item {
    commandId: number;
    dishId: number;
    amount: number;
    status: string;
    // add other properties if needed
}

export const createItemCommand = async (itemData: Item) => {
    try {
        console.log("Creating item with data:", itemData);
        const response = await api.post('item-command', itemData);
        if (response.status !== 200) throw new Error("Error creating command");
    } catch (error) {
        console.error("Error in createCommand:", error);
        throw error;
    }
};

export const getItemsByCommandId = async (commandId: number) => {
    try {
        console.log("Fetching items for command ID:", commandId);
        const response = await api.get(`item-command/command/${commandId}`);
        if (response.status !== 200) throw new Error("Error fetching items for command");
        return response.data;
    } catch (error) {
        console.error("Error in getItemsByCommandId:", error);
        throw error;
    }
}