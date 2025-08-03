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

export const getTablesByStatus = async (status: string) => {
    try {
        console.log("Fetching tables...");
        const response = await api.get(`table/status/${status}`);
        if (response.status !== 200) throw new Error("Error fetching tables");
        console.log("Tables fetched successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error in getTables:", error);
        throw error;
    }
}; 

export const updateStatus = async (id: number, status: string) => {
    try {
        console.log(`Updating table ${id} status to ${status}...`);
        const response = await api.put(`table/${id}`, { status });
        if (response.status !== 200) throw new Error("Error updating table status");
        console.log("Table status updated successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error in updateStatus:", error);
        throw error;
    }
};