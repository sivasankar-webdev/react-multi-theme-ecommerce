import { Routes, Route, Navigate } from "react-router-dom";
import ThemeRoutes from "../ThemeRouter";
import NotFound from "../../shared/components/NotFound";

export default function AppRouter() {
  return (
    <Routes>

      {/* Default route → open theme1 */}
      <Route path="/" element={<Navigate to="/theme1" replace />} />

      {/* All theme routing handled here */}
      <Route path="/:theme/*" element={<ThemeRoutes />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />   {/* ← catches /xyz garbage URLs */}

    </Routes>
  );
}