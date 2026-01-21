import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserHome from "./pages/user/UserHome";
import AdminDashboard from '../src/pages/admin/AdminDashboard'
import ProtectedRoute from "./components/ProtectedRoute";
import Services from "./pages/admin/Services";
import Professionals from "./pages/admin/Professionals";
import Bookings from "./pages/admin/Bookings";


const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
>
  <Route path="services" element={<Services />} />
  <Route path="professionals" element={<Professionals />} />
  <Route path="bookings" element={<Bookings />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
