import api from "./index";

export const getAllDishes = async () => {
  const response = await api.get("dishes/");
  if (response.status !== 200)
    throw new Error("No se pudieron cargar los platos");
  return await response.data;
};

export const getDishesByMenu = async (menuId: number) => {
  const response = await api.get(`dishes/menu/${menuId}`);
  if (response.status !== 200)
    throw new Error("No se pudieron cargar los platos");
  return await response.data;
};
