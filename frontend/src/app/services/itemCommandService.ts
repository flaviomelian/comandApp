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