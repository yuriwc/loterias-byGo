import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Cria a instância do router
const router = createRouter({ routeTree })

// Adiciona type safety para o router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App
