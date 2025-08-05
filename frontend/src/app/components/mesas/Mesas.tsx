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
    fetchTables();
  }, []);

  const updateTableStatus = async (id: number, status: string) => {
    try {
      await updateStatus(id, status);
      fetchTables();
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  const renderTables = (tables: Table[], actions: JSX.Element[]) => (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 w-full">
      {tables.map((table: Table) => (
        <div
          key={table.id}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md border text-center p-4 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors duration-200"
        >
          <p className="text-lg font-semibold">Mesa {table.number}</p>
          <p className="text-sm text-gray-300">Ubicación: {table.location}</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center">
            {actions.map((action, i) => (
              <React.Fragment key={i}>{action(table)}</React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-[84vh] p-4 sm:p-6 bg-gray-800 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">MESAS</h1>

      {/* Libres */}
      <section className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl mb-4 text-center">Libres</h2>
        {renderTables(tables, [
          (table: Table) => (
            <button
              onClick={() => updateTableStatus(table.id, "reservada")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Reservar
            </button>
          ),
          (table: Table) => (
            <button
              onClick={() => updateTableStatus(table.id, "ocupada")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Ocupar
            </button>
          ),
        ])}
      </section>

      {/* Ocupadas */}
      <section className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl mb-4 text-center">Ocupadas</h2>
        {renderTables(occupiedTables, [
          (table: Table) => (
            <button
              onClick={() => updateTableStatus(table.id, "libre")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Liberar
            </button>
          ),
        ])}
      </section>

      {/* Reservadas */}
      <section className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl mb-4 text-center">Reservadas</h2>
        {renderTables(reservedTables, [
          (table: Table) => (
            <button
              onClick={() => updateTableStatus(table.id, "ocupada")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Ocupar
            </button>
          ),
          (table: Table) => (
            <button
              onClick={() => updateTableStatus(table.id, "libre")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cancelar Reserva
            </button>
          ),
        ])}
      </section>
    </div>
  );
};

export default Mesas;
