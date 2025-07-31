import { getAllMenus } from "@/app/services/menuService";
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
        const response = await getAllMenus();
        setMenus(response);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchMenus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-gray-800 text-gray-100">
      <h1 className="text-lg font-bold">MENÚS</h1>
      <div className="grid grid-cols-4 items-center mt-5">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white p-4 rounded mb-2 mr-2 w-64 h-32 flex flex-col hover:shadow-2xl hover:bg-gray-600 transition-all 100 justify-between"
          >
            <h2 className="text-lg font-bold">{menu.description}</h2>
            <p className="text-sm">Precio: {menu.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menus;
