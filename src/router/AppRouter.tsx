import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEventPage from '../pages/CreateEventPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default – redirect root to create event page */}
        <Route path="/" element={<Navigate to="/events/new" replace />} />
        <Route path="/events/new" element={<CreateEventPage />} />
      </Routes>
    </BrowserRouter>
  );
}
