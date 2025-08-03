"use client";
import React, { useState, useEffect } from "react";
import { getTablesByStatus, updateStatus } from "../../services/tableService";

interface Table {
  id: number;
  number: number;
  location: string;
}

const Mesas = () => {

  const [tables, setTables] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);
  const [reservedTables, setReservedTables] = useState([]);

  const fetchTables = async () => {
    try {
      const free = await getTablesByStatus("libre");
      const occupied = await getTablesByStatus("ocupada");
      const reserved = await getTablesByStatus("reservada");
      setTables(free);
      setOccupiedTables(occupied);
      setReservedTables(reserved);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    fetchTables(); // solo se ejecuta al montar el componente
  }, []); // ✅ sin dependencias

  const updateTableStatus = async (id: number, status: string) => {
    try {
      await updateStatus(id, status);
      fetchTables(); // Refrescar las mesas después de actualizar el estado
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">MESAS</h1>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Libres</h2>
        <div className="flex flex-wrap justify-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {tables.map((table: Table) => (
            <div
              key={table.id}
              className="border text-center p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
              <div>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => updateTableStatus(table.id, "reservada")}
                >
                  Reservar
                </button>
                <button
                  className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={() => updateTableStatus(table.id, "ocupada")}
                >
                  Ocupar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Ocupadas</h2>
        <div className="flex flex-wrap justify-center text-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {occupiedTables.map((table: Table) => (
            <div
              key={table.id}
              className="border p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
              <div>
                <button
                  className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={() => updateTableStatus(table.id, "libre")}
                >
                  Liberar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Reservadas</h2>
        <div className="flex flex-wrap text-center justify-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {reservedTables.map((table: Table) => (
            <div
              key={table.id}
              className="border p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
              <div>
                <button
                  className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={() => updateTableStatus(table.id, "ocupada")}
                >
                  Ocupar
                </button>
                <button
                  className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                  onClick={() => updateTableStatus(table.id, "libre")}
                >
                  Cancelar Reserva
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mesas;
