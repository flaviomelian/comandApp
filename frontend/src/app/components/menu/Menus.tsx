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
    <div className="flex flex-col items-center justify-center min-h-[84vh] mt-0 sm:mt-11 overflow-y-auto p-2 bg-gray-800 text-gray-100 border-8 border-gray-700 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold mt-10">MENÚS</h1>
      <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white p-4 rounded mb-2 flex flex-col hover:shadow-2xl hover:bg-gray-600 transition-all justify-evenly w-full h-32 pb-10"
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
