"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Usa iconos de Lucide o FontAwesome

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!pathname) return null;

  const linkClass = (href: string) =>
    `text-left block text-lg font-semibold p-4 rounded-xl shadow w-60
    bg-white text-black
    hover:bg-gray-50 hover:shadow-lg
    transition flex flex-col justify-between
    ${pathname === href ? "bg-gray-300 font-bold shadow-inner" : ""}`;

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center w-full md:w-auto">🍽️ ComandApp</h1>

        {/* Botón hamburguesa visible solo en móvil */}
        <button
          className="md:hidden absolute right-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="p-4 text-right w-full"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        <ul className="flex flex-col gap-4 p-4 pb-20">
          <li>
            <a href="/menu-del-dia" className={linkClass("/menu-del-dia")}>
              🧾 Menú del Día
              <p className="text-sm text-gray-600 mt-1">
                Ver el menú del día activo.
              </p>
            </a>
          </li>
          <li>
            <a href="/comandas/nueva" className={linkClass("/comandas/nueva")}>
              📋 Tomar Comanda
              <p className="text-sm text-gray-600 mt-1">Atender a una mesa.</p>
            </a>
          </li>
          <li>
            <a href="/comandas" className={linkClass("/comandas")}>
              👨‍🍳 Comandas Activas
              <p className="text-sm text-gray-600 mt-1">
                Mostrar comandas en cocina.
              </p>
            </a>
          </li>
          <li>
            <a href="/mesas" className={linkClass("/mesas")}>
              🪑 Estado de Mesas
              <p className="text-sm text-gray-600 mt-1">
                Ocupación de mesas en sala.
              </p>
            </a>
          </li>
          <li>
            <a href="/menus" className={linkClass("/menus")}>
              🧾 Menús
              <p className="text-sm text-gray-600 mt-1">
                Ver, Crear o Editar Menús.
              </p>
            </a>
          </li>
          <li>
            <a href="/platos" className={linkClass("/platos")}>
              🍽️ Platos
              <p className="text-sm text-gray-600 mt-1">
                Ver, Crear o Editar Platos.
              </p>
            </a>
          </li>
        </ul>
      </nav>

      {/* Menú normal en desktop */}
      <nav className="mt-4 hidden md:flex">
        <ul className="flex flex-wrap gap-20 w-full max-w-8xl mx-auto justify-center">
          <li>
            <a href="/menu-del-dia" className={linkClass("/menu-del-dia")}>
              🧾 Menú del Día
              <p className="text-sm text-gray-600 mt-1">
                Ver el menú del día activo.
              </p>
            </a>
          </li>
          <li>
            <a href="/comandas/nueva" className={linkClass("/comandas/nueva")}>
              📋 Tomar Comanda
              <p className="text-sm text-gray-600 mt-1">Atender a una mesa.</p>
            </a>
          </li>
          <li>
            <a href="/comandas" className={linkClass("/comandas")}>
              👨‍🍳 Comandas Activas
              <p className="text-sm text-gray-600 mt-1">
                Mostrar comandas en cocina.
              </p>
            </a>
          </li>
          <li>
            <a href="/mesas" className={linkClass("/mesas")}>
              🪑 Estado de Mesas
              <p className="text-sm text-gray-600 mt-1">
                Ocupación de mesas en sala.
              </p>
            </a>
          </li>
          <li>
            <a href="/menus" className={linkClass("/menus")}>
              🧾 Menús
              <p className="text-sm text-gray-600 mt-1">
                Ver, Crear o Editar Menús.
              </p>
            </a>
          </li>
          <li>
            <a href="/platos" className={linkClass("/platos")}>
              🍽️ Platos
              <p className="text-sm text-gray-600 mt-1">
                Ver, Crear o Editar Platos.
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
