import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPlaces from "./pages/AdminPlaces";
import AddPlace from "./pages/AddPlace";
import PlaceDetail from "./pages/PlaceDetail";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/places" element={<ProtectedRoute><AdminPlaces /></ProtectedRoute>} />
          <Route path="/admin/places/new" element={<ProtectedRoute><AddPlace /></ProtectedRoute>} />
          <Route path="/admin/places/:id" element={<ProtectedRoute><PlaceDetail /></ProtectedRoute>} />
          <Route path="/r/:slug" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
