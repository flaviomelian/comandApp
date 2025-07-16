export default function Home() {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-100 mb-2">🍽️ ComandApp</h1>
      <p className="text-gray-500 text-lg mb-6">{today}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card title="🧾 Menú del Día" href="/menu-del-dia">
          Ver o editar el menú activo.
        </Card>

        <Card title="📋 Tomar Comanda" href="/comandas/nueva">
          Crear una comanda para una mesa.
        </Card>

        <Card title="👨‍🍳 Ver Comandas Activas" href="/comandas">
          Mostrar comandas en cocina/bar.
        </Card>

        <Card title="🪑 Estado de Mesas" href="/mesas">
          Ver ocupación de mesas en sala.
        </Card>
      </div>
    </main>
  );
}

function Card({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-gray-200 shadow bg-gray-100 hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out p-6"
    >
      <h2 className="text-xl font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-gray-900">{children}</p>
    </a>
  );
}

