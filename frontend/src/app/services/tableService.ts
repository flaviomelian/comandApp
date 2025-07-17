import api from "./index";

export const getTables = async () => {
    try {
        console.log("Fetching tables...");
        const response = await api.get('table');
        if (response.status !== 200) throw new Error("Error fetching tables");
        console.log("Tables fetched successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error in getTables:", error);
        throw error;
    }
};    