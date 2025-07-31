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

  const expandSequentially = async () => {
    const preparacionComandas = comandas.filter(
      (c) => c.status === "en preparación"
    );
    console.log("Expanding sequentially for:", preparacionComandas);

    for (const comanda of preparacionComandas) {
      if (!globalStatusRef.current) {
        console.log("Global status disabled, breaking loop.");
        break;
      }
      await toggleDetails(comanda.id);
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  };

  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await getCommands();
        const data = await response; // Ensure this returns the array of comandas
        setComandas(data);
      } catch (error) {
        console.error("Error fetching comandas:", error);
      }
    };
    fetchComandas();
  }, []);

  useEffect(() => {
    globalStatusRef.current = globalStatus;
    console.log("Global status ref updated:", globalStatusRef.current);
    expandSequentially();
  }, [globalStatus]);

  useEffect(() => {
    console.log("Global status changed:", globalStatus);
    globalStatusRef.current = globalStatus;
    console.log("Global status ref updated:", globalStatusRef.current);
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
      console.log("Filtered comandas:", response);
      setComandas(response);
    } catch (error) {
      console.error("Error fetching all comandas:", error);
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
    <div className="min-h-screen flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center w-full">
        Comandas
      </h2>
      <div className="flex justify-around mt-20">
        <h3
          className="px-45 py-2 mr-2 bg-gray-500 text-gray-800 rounded-t-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:py-4 ease-in-out duration-300"
          onClick={() => getAll()}
        >
          Todas
        </h3>
        <h3
          className="px-45 py-2 mr-2 ml-2 bg-gray-500 text-gray-700 rounded-t-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:py-4 ease-in-out duration-300"
          onClick={() => filter("en preparación")}
        >
          En preparación
        </h3>
        <h3
          className="px-45 py-2 mr-2 ml-2 bg-gray-500 text-gray-700 rounded-t-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:py-4 ease-in-out duration-300"
          onClick={() => filter("servida")}
        >
          Servidas
        </h3>
        <h3
          className="px-45 py-2 ml-2 bg-gray-500 text-gray-700 rounded-t-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:py-4 ease-in-out duration-300"
          onClick={() => filter("cancelada")}
        >
          Canceladas
        </h3>
      </div>

      <table className="ml-auto mr-auto w-2/3 bg-black border-none rounded-lg overflow-hidden mb-auto mt-20">
        <thead className="bg-gray-950 text-white rounded-t-lg">
          <tr className="mb-100 mt-100">
            <th className="text-center py-2 shadow-2xl text-white">ID</th>
            <th className="text-center py-2 shadow-2xl text-white">Estado</th>
            <th className="text-center py-2 shadow-2xl text-white">
              Observaciones
            </th>
            <th className="text-center py-2 shadow-20xl text-white">Mesa</th>
          </tr>
        </thead>
        <tbody>
          {comandas.map((comanda: Comanda) => (
            <React.Fragment key={comanda.id}>
              <tr
                className="odd:bg-gray-900 even:bg-gray-700 text-center hover:bg-gray-800 ease-in-out duration-300 cursor-pointer"
                onClick={() => {
                  if (expandedCommandId === comanda.id) {
                    // Si es la misma: cerrar y reactivar automático
                    setExpandedCommandId(null);
                    setItems([]);
                    setGlobalStatus(true);
                  } else {
                    // Si es otra: abrir esta y detener automático
                    setGlobalStatus(false);
                    toggleDetails(comanda.id);
                  }
                }}
              >
                <td className="text-center py-3 hover:py-5 transition-all duration-300">
                  {comanda.id}
                </td>
                <td className="text-center py-3 hover:py-5 transition-all duration-300">
                  {comanda.status}
                </td>
                <td className="text-center py-3 hover:py-5 transition-all duration-300">
                  {comanda.observations}
                </td>
                <td className="text-center py-3 hover:py-5 transition-all duration-300">
                  {comanda.tableId}
                </td>
              </tr>

              {expandedCommandId === comanda.id && (
                <tr className="bg-gray-800">
                  <td colSpan={4} className="p-4 text-white text-left">
                    {items.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {items.map((item, idx) => (
                          <li
                            className="list-none text-center justify-between"
                            key={idx}
                          >
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
    </div>
  );
};

export default Comandas;
