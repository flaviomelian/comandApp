import { getAllMenus } from "@/app/services/menuService";
import { getDishesByMenu } from "@/app/services/dishService";
import React, { useState, useEffect, useRef } from "react";

type Menu = {
  id: number;
  description: string;
  price: number;
};

type Plato = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [expandedMenuId, setExpandedMenuId] = useState<number | null>(null);
  const [platosByMenu, setPlatosByMenu] = useState<{ [key: number]: Plato[] }>(
    {}
  );

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await getAllMenus();
        setMenus(response);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchMenus();
  }, []);

  const handleMenuClick = async (menuId: number) => {
    if (expandedMenuId === menuId) {
      setExpandedMenuId(null); // colapsa si ya estaba abierto
      return;
    }

    if (!platosByMenu[menuId]) {
      try {
        const response = await getDishesByMenu(menuId);
        setPlatosByMenu((prev) => ({ ...prev, [menuId]: response }));
      } catch (error) {
        console.error("Error fetching platos:", error);
      }
    }

    setExpandedMenuId(menuId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[84vh] mt-0 sm:mt-11 overflow-y-auto p-2 bg-gray-800 text-gray-100 border-8 border-gray-700 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold mt-10">MENÚS</h1>
      <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menus.map((menu) => {
          const isExpanded = expandedMenuId === menu.id;
          return (
            <div
              key={menu.id}
              className="bg-gray-700 text-white p-4 rounded mb-2 flex flex-col hover:shadow-2xl hover:bg-gray-600 transition-all justify-evenly w-full min-h-20 py-5 cursor-pointer"
              onClick={() => handleMenuClick(menu.id)}
            >
              <h2 className="text-lg font-bold">{menu.description}</h2>
              <p className="text-sm">Precio: {menu.price} €</p>

              <div
                style={{
                  maxHeight: isExpanded ? "500px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {platosByMenu[menu.id] && (
                  <div className="mt-4 bg-gray-800 p-2 rounded">
                    <h3 className="font-semibold mb-2 text-sm">Platos:</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {platosByMenu[menu.id].map((plato) => (
                        <li key={plato.id}>
                          <span className="font-medium">{plato.name}</span> –{" "}
                          {plato.price} € (Precio Individual)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menus;
