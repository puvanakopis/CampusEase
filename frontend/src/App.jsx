import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

import Home from "./pages/user/Home";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";
import Accommodation from "./pages/user/Accommodation";
import AccommodationDetails from "./pages/user/AccommodationDetails";
import Vehicle from "./pages/user/Vehicle";
import VehicleDetails from "./pages/user/VehicleDetails";
import Owner from "./pages/user/Owner";
import Booking from "./pages/user/Booking";
import Payment from "./pages/user/Payment";
import Profile from "./pages/user/Profile";
import Bookings from "./pages/user/Bookings";
import SavedItems from "./pages/user/SavedItems";
import NotFound from "./pages/user/NotFound";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  const location = useLocation();
  const authPages = ["/login", "/register", "/forgot-password"];
  const showNavbar = !authPages.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/owner/:id" element={<Owner />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/saved-items" element={<SavedItems />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavbar && <Footer />}
    </>
  );
}

export default App;