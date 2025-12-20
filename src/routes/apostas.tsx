import { createFileRoute } from '@tanstack/react-router'
import InserirAposta from '../presentation/flows/inserirAposta'

export const Route = createFileRoute('/apostas')({
  component: InserirAposta,
})
