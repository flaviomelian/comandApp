"use client";
import React, { useState, useEffect } from "react";
import { getAllDishes } from "../../services/dishService";

type Dish = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: "entrante" | "principal" | "postre" | "bebida";
  available: boolean;
  createdAt?: string; // o Date si ya lo parseas
  menuId?: number;
};


const Platos = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getAllDishes();
        setDishes(response);
      } catch (error) {
        console.error("Error fetching comandas:", error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[84vh] mt-0 sm:mt-11 overflow-y-auto p-2 bg-gray-800 text-gray-100 border-8 border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center w-full">
        Platos
      </h2>
      <table className="hidden md:table w-full max-w-4xl bg-black rounded-lg overflow-hidden mb-10">
        <thead className="bg-gray-950 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Menú perteneciente</th>
            <th className="p-2">Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish: Dish) => (
            <tr
              key={dish.id}
              className="odd:bg-gray-900 even:bg-gray-700 text-center hover:bg-gray-800 transition cursor-pointer"
            >
              <td className="p-3">{dish.id}</td>
              <td className="p-3">{dish.name}</td>
              <td className="p-3">{dish.category}</td>
              <td className="p-3">{dish.menuId}</td>
              <td className="p-3">{dish.available ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Platos;
