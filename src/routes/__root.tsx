import { createRootRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '@heroui/react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()
  const routerState = useRouterState()

  // Determina qual rota está ativa
  const currentPath = routerState.location.pathname
  const isApostasActive = currentPath === '/apostas' || currentPath === '/'
  const isResultadosActive = currentPath === '/resultados'

  return (
    <>
      {/* Navegação */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Lotofácil</h1>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isApostasActive ? 'primary' : 'secondary'}
                onClick={() => navigate({ to: '/apostas' })}
                size="md"
              >
                Apostas
              </Button>
              <Button
                variant={isResultadosActive ? 'primary' : 'secondary'}
                onClick={() => navigate({ to: '/resultados' })}
                size="md"
              >
                Resultados
              </Button>
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
