"use client";
import { getMenusByDay } from "@/app/services/menuService";
import React, { useState, useEffect } from "react";

type Menu = {
  description: string;
  price: number;
  // add other properties if needed
};

const ItemComanda = () => {
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
    <div>
      <select className="border border-gray-300 rounded p-2 w-full max-w-xs">
        <option value="">Seleccione un menú</option>
        {menus.map((menu, index) => (
          <option key={index} value={menu.description}>
            {menu.description} - {menu.price} €
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemComanda;
