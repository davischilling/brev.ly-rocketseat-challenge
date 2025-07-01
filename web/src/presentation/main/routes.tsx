import { Route, Routes } from 'react-router-dom'
import { LinksPage } from './pages/Links'
import { RedirectPage } from './pages/Redirect'
import { NotFoundPage } from './pages/NotFound'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LinksPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/:shortenedUrl" element={<RedirectPage />} />
    </Routes>
  )
}
