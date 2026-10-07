import { Route, Routes } from 'react-router'

import ActivityPage from '@/pages/ActivityPage'
import AskPage from '@/pages/AskPage'
import ConfirmationPage from '@/pages/ConfirmationPage'
import EmailPage from '@/pages/EmailPage'
import NotFoundPage from '@/pages/NotFoundPage'
import YesPage from '@/pages/YesPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<AskPage />} />
      <Route path="/oui" element={<YesPage />} />
      <Route path="/activite" element={<ActivityPage />} />
      <Route path="/carte" element={<EmailPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
