import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './routes'

export const MainApp = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AppRoutes />
    </QueryClientProvider>
  )
}
