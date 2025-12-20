import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  // Redireciona para a página de apostas por padrão
  return <Navigate to="/apostas" />
}
