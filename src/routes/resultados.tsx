import { createFileRoute } from '@tanstack/react-router'
import AcompanharResultados from '../presentation/flows/acompanharResultados'

export const Route = createFileRoute('/resultados')({
  component: AcompanharResultados,
})
