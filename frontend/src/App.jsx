import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchDonor from "./pages/SearchDonor";
import EmergencyRequest from "./pages/EmergencyRequest";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/search"
          element={<SearchDonor />}
        />

        <Route
          path="/emergency"
          element={<EmergencyRequest />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* Protected Pages */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;