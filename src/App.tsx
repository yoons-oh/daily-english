import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TodayPage from './pages/TodayPage'
import ReviewPage from './pages/ReviewPage'
import RecordsPage from './pages/RecordsPage'
import CatalogPage from './pages/CatalogPage'
import ConversationPage from './pages/ConversationPage'
import CreateConversationPage from './pages/CreateConversationPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/conversation/new" element={<CreateConversationPage />} />
        <Route path="/conversation/:id" element={<ConversationPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/records" element={<RecordsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
