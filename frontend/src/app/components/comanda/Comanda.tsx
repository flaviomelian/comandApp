"use client";
import React, { useEffect, useState } from "react";
import ItemComanda from "@/app/components/itemComanda/ItemComanda";
import { createCommand } from "@/app/services/commandService";
import { getTables } from "../../services/tableService";
import { createItemCommand } from "@/app/services/itemCommandService";
import { getMenuByName } from "@/app/services/menuService";
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

  const getDishByName = async (item: string) => {
    return await getMenuByName(item)
  }

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
        items.map(async (item) => {
            console.log("Processing item:", item);
          const dish = await getDishByName(item); // <-- Necesitas esto

          if (!dish) {
            console.warn(
              `No se encontró un plato con nombre: ${item}`
            );
            return;
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
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800"
      onSubmit={uploadComanda}
    >
      <h1>Nueva Comanda</h1>
      <label className="text-gray-200 mb-2">
        Mesa:
        <select
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
          value={mesaId}
          onChange={(e) => setMesaId(Number(e.target.value))}
        >
          <option value={0}>Seleccione una mesa</option>
          {tables.map((mesa: Table) => (
            <option key={mesa.id} value={mesa.id}>
              Mesa {mesa.number} ({mesa.location})
            </option>
          ))}
        </select>
      </label>
      <label className="text-gray-200 mb-2">
        Número de comensales:
        <input
          type="number"
          min="1"
          max="20"
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
          value={customersAmount}
          onChange={(e) => setCustomersAmount(Number(e.target.value))}
        />
      </label>
      {customersAmount > 0 && (
        <h2 className="text-lg font-bold mb-2">Primeros</h2>
      )}
      {Array.from({ length: customersAmount }, (_, i) => (
        <ItemComanda key={i} itemChange={handleItemChange} />
      ))}
      {customersAmount > 0 && (
        <h2 className="text-lg font-bold mb-2">Segundos</h2>
      )}
      {Array.from({ length: customersAmount }, (_, i) => (
        <ItemComanda key={i} itemChange={handleItemChange} />
      ))}
      <label className="text-gray-200 mb-2">
        Observaciones:
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
      </label>
      <label className="text-gray-200">
        ¿Postre?
        <input
          type="checkbox"
          className="ml-2"
          onClick={() => setDessert(!dessert)}
        />
      </label>
      {dessert && (
        <div className="mt-4">
          <label className="text-gray-200 mb-2">Elija su postre</label>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600 transition"
      >
        Crear Comanda
      </button>
    </form>
  );
};

export default Comanda;
