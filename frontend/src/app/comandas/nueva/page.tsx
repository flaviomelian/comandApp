import React from 'react'

const page = () => {
  return (
    <form className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800">
        <h1>Nueva Comanda</h1>
        <label className="text-gray-200 mb-2">
          Mesa:
          <input type="text" className="border border-gray-300 rounded p-2 w-full max-w-xs" />
        </label>
        <label className="text-gray-200 mb-2">
          Cliente:
          <input type="text" className="border border-gray-300 rounded p-2 w-full max-w-xs" />
        </label>
        <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600 transition">
          Crear Comanda
        </button>
    </form>
  )
}

export default page
