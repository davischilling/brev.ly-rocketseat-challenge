import { BrowserRouter as Router } from 'react-router-dom'

import { MainApp } from './presentation/main'

export function App() {
  return (
    <main className="h-dvh w-dvw flex flex-col items-center justify-center">
      <Router>
        <MainApp />
      </Router>
    </main>
  )
}
