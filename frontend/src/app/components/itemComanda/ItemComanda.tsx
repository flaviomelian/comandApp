"use client";
import { getMenusByDay } from "@/app/services/menuService";
import React, { useState, useEffect } from "react";

type Dish = {
  id: number;
  description: string;
  price: number;
  category: string;
  available: boolean;
  menuId: BigInteger;
};

type ItemComandaProps = {
  itemChange: (item: string) => void;
};

const ItemComanda = ({ itemChange }: ItemComandaProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getMenusByDay(new Date().getDay());
        setDishes(response);
      } catch (error) {
        console.error("Error fetching Dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <div>
      <select className="border border-gray-300 rounded p-2 w-full max-w-xs"
      onChange={(e) => itemChange((e.target as HTMLSelectElement).value)}>
        <option value="">Seleccione un menú</option>
        {dishes.map((dish, index) => (
          <option key={index} value={dish.id}>
            {dish.description} - {dish.price} €
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemComanda;
