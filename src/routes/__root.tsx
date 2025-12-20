import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/* Navegação */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Lotofácil</h1>
            </div>

            <div className="flex gap-4">
              <Link
                to="/apostas"
                className="px-4 py-2 rounded-lg font-medium transition-colors [&.active]:bg-primary [&.active]:text-white hover:bg-gray-100"
                activeProps={{ className: 'bg-primary text-white' }}
              >
                Criar Apostas
              </Link>
              <Link
                to="/resultados"
                className="px-4 py-2 rounded-lg font-medium transition-colors [&.active]:bg-primary [&.active]:text-white hover:bg-gray-100"
                activeProps={{ className: 'bg-primary text-white' }}
              >
                Acompanhar Resultados
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo das rotas */}
      <Outlet />

      {/* DevTools (só em desenvolvimento) */}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
