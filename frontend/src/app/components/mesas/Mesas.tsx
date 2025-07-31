"use client";
import React, { useState, useEffect } from "react";
import { getTablesByStatus } from "../../services/tableService";

interface Table {
  id: number;
  number: number;
  location: string;
}

const Mesas = () => {
  const [tables, setTables] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);
  const [reservedTables, setReservedTables] = useState([]);

  useEffect(() => {
    // Fetch tables from the API or service
    const fetchTables = async () => {
      try {
        // Simulate fetching tables
        const free = await getTablesByStatus("libre");
        setTables(free);
        const occupied = await getTablesByStatus("ocupada");
        setOccupiedTables(occupied);
        const reserved = await getTablesByStatus("reservada");
        setReservedTables(reserved);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">MESAS</h1>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Libres</h2>
        <div className="flex flex-wrap justify-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {tables.map((table: Table) => (
            <div
              key={table.id}
              className="border p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Ocupadas</h2>
        <div className="flex flex-wrap justify-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {occupiedTables.map((table: Table) => (
            <div
              key={table.id}
              className="border p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl text-center">Reservadas</h2>
        <div className="flex flex-wrap justify-center rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 p-4 bg-gray-700">
          {reservedTables.map((table: Table) => (
            <div
              key={table.id}
              className="border p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
            >
              <p>Mesa {table.number}</p>
              <p>Ubicación: {table.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mesas;
