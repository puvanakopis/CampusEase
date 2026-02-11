import "./App.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

import OwnerNavbar from './components/owner/OwnerNavbar';
import OwnerFooter from './components/owner/OwnerFooter';

import AdminNavbar from "./components/admin/AdminNavbar";
import AdminFooter from "./components/admin/AdminFooter";

// Auth Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
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

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerAccommodation from "./pages/owner/OwnerAccommodation";
import OwnerVehicle from "./pages/owner/OwnerVehicle";
import OwnerBooking from "./pages/owner/OwnerBooking";
import OwnerProfile from "./pages/owner/OwnerProfile";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerSupport from "./pages/owner/OwnerSupport";
import OwnerApplication from "./pages/owner/OwnerApplication";
import OwnerNotFound from "./pages/owner/OwnerNotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAccommodation from "./pages/admin/AdminAccommodation";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminOwner from "./pages/admin/AdminOwner";
import AdminUser from "./pages/admin/AdminUser";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSupport from "./pages/admin/Support";
import AdminNotFound from "./pages/admin/AdminNotFound";

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ role, allowedRoles }) => {
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="*" />;
};

function App() {
  const role = "staff"; // "student", "staff", "owner", "admin"
  const location = useLocation();

  const authPages = ["/login", "/register", "/forgot-password"];
  const showNavbar = !authPages.includes(location.pathname);

  const renderNavbar = () => {
    if (!showNavbar) return null;

    switch (role) {
      case "owner":
        return <OwnerNavbar />;
      case "admin":
        return <AdminNavbar />;
      case "student":
      case "staff":
      default:
        return <Navbar />;
    }
  };

  const renderFooter = () => {
    if (!showNavbar) return null;

    switch (role) {
      case "owner":
        return <OwnerFooter />;
      case "admin":
        return <AdminFooter />;
      case "student":
      case "staff":
      default:
        return <Footer />;
    }
  };

  return (
    <>
      {renderNavbar()}

      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />

        {/* User Routes (student/staff) */}
        <Route element={<ProtectedRoute role={role} allowedRoles={["student", "staff"]} />}>
          <Route path="/owner/:id" element={<Owner />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/saved-items" element={<SavedItems />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* Owner Routes */}
        <Route element={<ProtectedRoute role={role} allowedRoles={["owner"]} />}>
          <Route path="/owner" element={<OwnerApplication />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/accommodation" element={<OwnerAccommodation />} />
          <Route path="/owner/vehicle" element={<OwnerVehicle />} />
          <Route path="/owner/bookings" element={<OwnerBooking />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
          <Route path="/owner/support" element={<OwnerSupport />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute role={role} allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/accommodation" element={<AdminAccommodation />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/owner" element={<AdminOwner />} />
          <Route path="/admin/users" element={<AdminUser />} />
          <Route path="/admin/bookings" element={<AdminBooking />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/support" element={<AdminSupport />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          role === "owner" ? <OwnerNotFound /> :
            role === "admin" ? <AdminNotFound /> :
              <NotFound />
        } />
      </Routes>

      {renderFooter()}
    </>
  );
}

export default App;