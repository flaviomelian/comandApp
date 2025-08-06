"use client";
import React, { useEffect, useState } from "react";
import ItemComanda from "@/app/components/itemComanda/ItemComanda";
import { createCommand } from "@/app/services/commandService";
import { getTables } from "../../services/tableService";
import { createItemCommand } from "@/app/services/itemCommandService";
import { getMenuById } from "@/app/services/menuService";
import { stat } from "fs";

interface Table {
  id: number;
  number: number;
  location: string;
}

const Comanda = () => {
  const [customersAmount, setCustomersAmount] = useState(0);
  const [mesaId, setMesaId] = useState(0);
  const [dessert, setDessert] = useState(false);
  const [observations, setObservations] = useState("sin observaciones");
  const [tables, setTables] = useState<Table[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await getTables();
        setTables(response);
        console.log("Tables fetched successfully useEffect:", response);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  const getDishById = async (item: number) => {
    return await getMenuById(item);
  };

  const uploadComanda = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const command = await createCommand({
        tableId: mesaId,
        status: "en preparación",
        observations: observations,
      });

      const commandId = command.id; // Asegúrate de que esto viene desde la API

      await Promise.all(
        // Se supone que se usa Promise.all para manejar múltiples promesas y escribirlas en
        items.map(async (item) => {
          console.log("Processing item:", item);
          const dish = await getDishById(Number(item)); // <-- Necesitas esto

          if (!dish) {
            console.warn(`No se encontró un plato con nombre: ${item}`);
            //return;
          }

          await createItemCommand({
            commandId: commandId,
            dishId: dish.id,
            amount: 1,
            status: "pendiente",
          });
        })
      );

      console.log("Comanda e items guardados exitosamente");
    } catch (error) {
      console.error("Error al crear la comanda o los items:", error);
    }
  };

  const handleItemChange = (item: string) => {
    console.log("Item added:", item);
    setItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      console.log("Current items (inside setState):", updatedItems);
      return updatedItems;
    });
  };

  return (
    <form
      onSubmit={uploadComanda}
      className="w-90 mx-auto max-w-2xl bg-gray-600 rounded-2xl shadow-lg p-8 flex flex-col gap-6"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800">
        🍽️ Nueva Comanda
      </h1>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Mesa:</label>
        <select
          value={mesaId}
          onChange={(e) => setMesaId(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
        >
          <option value={0}>Seleccione una mesa</option>
          {tables.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              Mesa {mesa.number} ({mesa.location})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">
          Número de comensales:
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={customersAmount}
          onChange={(e) => setCustomersAmount(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
        />
      </div>

      {customersAmount > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            🥗 Primeros
          </h2>
          {Array.from({ length: customersAmount }, (_, i) => (
            <ItemComanda key={`primer-${i}`} itemChange={handleItemChange} />
          ))}
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            🍗 Segundos
          </h2>
          {Array.from({ length: customersAmount }, (_, i) => (
            <ItemComanda key={`segundo-${i}`} itemChange={handleItemChange} />
          ))}
        </>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Observaciones:</label>
        <input
          type="text"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">¿Postre?</label>
        <input
          type="checkbox"
          checked={dessert}
          onChange={() => setDessert(!dessert)}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>

      {dessert && (
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Elija su postre</label>
          {/* Aquí iría la selección de postres */}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Crear Comanda
      </button>
    </form>
  );
};

export default Comanda;
