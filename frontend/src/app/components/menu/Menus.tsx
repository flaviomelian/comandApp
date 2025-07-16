import { getMenusByDay } from "@/app/services/menuService";
import React, { useState, useEffect } from "react";

type Menu = {
  description: string;
  price: number;
  // add other properties if needed
};

const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await getMenusByDay(new Date().getDay());
        setMenus(response);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchMenus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-gray-800 text-gray-100">
      <h1 className="text-lg font-bold">MENÚS DEL DÍA DE HOY: {new Date().toLocaleDateString("es-ES", {
        weekday: "long"}).toUpperCase()}</h1>
      {menus.map((menu, index) => (
        <div
          key={index}
          className="bg-gray-700 text-white p-4 rounded mb-2 w-64 h-32 flex flex-col justify-between"
        >
          <h2 className="text-lg font-bold">{menu.description}</h2>
          <p className="text-sm">Precio: {menu.price} €</p>
        </div>
      ))}
      {menus.length === 0 && (
        <p className="text-gray-400">No hay menús disponibles para hoy.</p>
      )}
    </div>
  );
};

export default Menus;
