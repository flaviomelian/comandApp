import api from "./index";
export const getMenusByDay = async (day: number) => {
    try {
        const response = await api.get(`menus/day/${day}`);
        console.log("Response:", response.data);
        if (response.status !== 200)
            throw new Error("Error fetching daily menu");
        return await response.data;
    } catch (error) {
        console.error("Error in getMenuByDay:", error);
        throw error;
    }
}

export const getMenuByName = async (name: string) => {
  try {
    const decodedName = decodeURIComponent(name);
    console.log("Decoded name:", decodedName);

    const response = await api.get(`/menus/name`, {
      params: {
        name: decodedName,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getMenuByName:", error);
    throw error;
  }
};
