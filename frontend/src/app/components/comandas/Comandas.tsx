"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  getCommands,
  getCommandsByStatus,
} from "@/app/services/commandService";
import { getItemsByCommandId } from "@/app/services/itemCommandService";

interface Comanda {
  id: number;
  tableId: number;
  status: string;
  observations: string;
}

interface Item {
  id: number;
  commandId: number;
  dishId: number;
  amount: number;
  status: string;
}

const Comandas = () => {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [expandedCommandId, setExpandedCommandId] = useState<number | null>(
    null
  );
  const [items, setItems] = useState<Item[]>([]);
  const [globalStatus, setGlobalStatus] = useState<boolean>(true);
  const globalStatusRef = useRef<boolean>(true);
  const lastIndexRef = useRef(0);
  const [selectedFilter, setSelectedFilter] = useState("Todas");

  const expandSequentially = async () => {
    const preparacionComandas = comandas.filter(
      (c) => c.status === "en preparación"
    );
    const total = preparacionComandas.length;

    if (total === 0) return;

    while (globalStatusRef.current) {
      const currentIndex = lastIndexRef.current % total;
      const comanda = preparacionComandas[currentIndex];

      await toggleDetails(comanda.id);
      lastIndexRef.current = (currentIndex + 1) % total;

      // Esperar 2.5s antes de continuar
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  };

  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await getCommands();
        setComandas(response);
      } catch (error) {
        console.error("Error fetching comandas:", error);
      }
    };
    fetchComandas();
  }, []);

  useEffect(() => {
    globalStatusRef.current = globalStatus;
    if (globalStatus) expandSequentially();
  }, [globalStatus]);

  const getAll = async () => {
    try {
      const response = await getCommands();
      setComandas(response);
    } catch (error) {
      console.error("Error fetching all comandas:", error);
    }
  };

  const filter = async (status: string) => {
    try {
      const response = await getCommandsByStatus(status);
      setComandas(response);
    } catch (error) {
      console.error("Error filtering comandas:", error);
    }
  };

  const toggleDetails = async (commandId: number) => {
    if (expandedCommandId === commandId) {
      setExpandedCommandId(null);
      setItems([]);
    } else {
      try {
        const response = await getItemsByCommandId(commandId);
        setItems(response);
        setExpandedCommandId(commandId);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 pt-20 sm:pt-40 pb-10 sm:pb-0 pl-5 pr-5">
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center w-full">
        Comandas
      </h2>

      {/* Filtros responsive */}
      <div className="flex flex-col md:flex-row justify-center gap-2 mb-6 w-full max-w-xl">
        {["Todas", "en preparación", "servida", "cancelada"].map(
          (estado, idx) => {
            const isActive = selectedFilter === estado;

            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedFilter(estado);
                  estado === "Todas" ? getAll() : filter(estado);
                }}
                className={`px-4 py-2 rounded transition font-semibold
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "bg-gray-500 text-white hover:bg-gray-300 hover:text-black"
          }`}
              >
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </button>
            );
          }
        )}
      </div>

      {/* Tabla para pantallas grandes */}
      <table className="hidden md:table w-full max-w-4xl bg-black rounded-lg overflow-hidden mb-10">
        <thead className="bg-gray-950 text-white">
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Observaciones</th>
            <th className="py-2">Mesa</th>
          </tr>
        </thead>
        <tbody>
          {comandas.map((comanda) => (
            <React.Fragment key={comanda.id}>
              <tr
                onClick={() => {
                  if (expandedCommandId === comanda.id) {
                    setExpandedCommandId(null);
                    setItems([]);
                    setGlobalStatus(true);
                  } else {
                    setGlobalStatus(false);
                    toggleDetails(comanda.id);
                  }
                }}
                className="odd:bg-gray-900 even:bg-gray-700 text-center hover:bg-gray-800 transition cursor-pointer"
              >
                <td className="py-3">{comanda.id}</td>
                <td className="py-3">{comanda.status}</td>
                <td className="py-3">{comanda.observations}</td>
                <td className="py-3">{comanda.tableId}</td>
              </tr>
              {expandedCommandId === comanda.id && (
                <tr className="bg-gray-800">
                  <td colSpan={4} className="p-4 text-white text-left">
                    {items.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {items.map((item, idx) => (
                          <li key={idx}>
                            🧾 ID Plato: {item.dishId} – Cantidad: {item.amount}{" "}
                            – Estado: {item.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay items para esta comanda.</p>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Vista responsive para móviles */}
      <div className="md:hidden w-full space-y-4">
        {comandas.map((comanda) => (
          <div
            key={comanda.id}
            className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition"
            onClick={() => {
              if (expandedCommandId === comanda.id) {
                setExpandedCommandId(null);
                setItems([]);
                setGlobalStatus(true);
              } else {
                setGlobalStatus(false);
                toggleDetails(comanda.id);
              }
            }}
          >
            <p>
              <strong>ID:</strong> {comanda.id}
            </p>
            <p>
              <strong>Estado:</strong> {comanda.status}
            </p>
            <p>
              <strong>Observaciones:</strong> {comanda.observations}
            </p>
            <p>
              <strong>Mesa:</strong> {comanda.tableId}
            </p>
            {expandedCommandId === comanda.id && (
              <div className="mt-2">
                {items.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {items.map((item, idx) => (
                      <li key={idx}>
                        🧾 ID Plato: {item.dishId} – Cantidad: {item.amount} –
                        Estado: {item.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay items para esta comanda.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comandas;
