import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

import OwnerNavbar from './components/owner/OwnerNavbar'
import OwnerFooter from './components/owner/OwnerFooter'

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

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
import MyBookings from "./pages/user/MyBookings";
import SavedItems from "./pages/user/SavedItems";
import Settings from "./pages/user/Settings";
import Support from "./pages/user/Support";
import NotFound from "./pages/user/NotFound";

import OwnerDashboard from "./pages/owner/OwnerDashboard";

function App() {
  const role = 'owner'

  const location = useLocation();
  const authPages = ["/login", "/register", "/forgot-password"];
  const showNavbar = !authPages.includes(location.pathname);

  return (
    <>
      {showNavbar && (role === "owner" ? <OwnerNavbar /> : <Navbar />)}

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
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/saved-items" element={<SavedItems />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />

        <Route path="/owner/" element={<OwnerDashboard />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showNavbar && (role === "owner" ? <OwnerFooter /> : <Footer />)}
    </>
  );
}

export default App;