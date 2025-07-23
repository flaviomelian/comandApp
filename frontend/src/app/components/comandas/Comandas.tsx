"use client";
import React, { useEffect, useState } from "react";
import { getCommands, getCommandsByStatus } from "@/app/services/commandService";

interface Comanda {
  id: number;
  tableId: number;
  status: string;
  observations: string;
}

const Comandas = () => {
  const [comandas, setComandas] = useState<Comanda[]>([]);

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

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center w-full">
        Comandas
      </h2>
      <div className="flex justify-around mt-20 border-b border-gray-300">
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
          {comandas.map((comanda: Comanda, index) => (
            <tr
              className="odd:bg-gray-900 even:bg-gray-700 text-center hover:bg-gray-800 hover:py-5 ease-in-out duration-300"
              key={index}
              onClick={() => console.log("Row clicked", comanda.id)}
            >
              <td className="text-center py-3">{comanda.id}</td>
              <td className="text-center py-3">{comanda.status}</td>
              <td className="text-center py-3">{comanda.observations}</td>
              <td className="text-center py-3">{comanda.tableId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comandas;
