import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Navbars and Footers
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import OwnerNavbar from './components/owner/OwnerNavbar';
import OwnerFooter from "./components/owner/OwnerFooter";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminFooter from "./components/admin/AdminFooter";

// Protected Route
import ProtectedRoute from "./route/ProtectedRoute";

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
import Payment from "./pages/user/Payment";
import Profile from "./pages/user/Profile";
import MyBookings from "./pages/user/MyBookings";
import SavedItems from "./pages/user/SavedItems";
import Settings from "./pages/user/Settings";
import Support from "./pages/user/Support";
import UserApplication from "./pages/user/UserApplication";
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

// Components
import Loading from "./components/user/Loading";
import ChatBot from "./components/user/ChatBot"; 

function App() {
  const { currentUser, authLoading } = useContext(AuthContext);
  const location = useLocation();

  if (authLoading) {
    return <Loading mainText="Checking authentication..." subText="Please wait" progress={50} />;
  }

  const role = currentUser?.role || "guest";

  const authPages = ["/login", "/register", "/forgot-password"];
  const showNavbarFooter = !authPages.includes(location.pathname);

  const renderNavbar = () => {
    if (!showNavbarFooter) return null;

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
    if (!showNavbarFooter) return null;

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

  // Only show ChatBot for student and staff
  const showChatBot = role === "student" || role === "staff";

  return (
    <>
      {renderNavbar()}

      {/* Toaster for notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "14px 18px",
            borderRadius: "12px",
            fontSize: "14px",
            border: "1px solid #E2E8F0",
          },
          success: {
            iconTheme: { primary: "#16A34A", secondary: "#FFFFFF" },
            className: "!bg-white !text-slate-900 shadow-lg border border-slate-200 rounded-xl",
          },
          error: {
            iconTheme: { primary: "#DC2626", secondary: "#FFFFFF" },
            className: "!bg-white !text-red-700 shadow-lg border border-red-200 rounded-xl",
          },
          loading: {
            className: "!bg-white !text-slate-700 shadow-lg border border-slate-200 rounded-xl",
          },
        }}
      />

      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute role={role} user={currentUser} />}>
          {/* User/Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<UserApplication />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/owner/:id" element={<Owner />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/saved-items" element={<SavedItems />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<OwnerApplication />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/accommodation" element={<OwnerAccommodation />} />
          <Route path="/owner/vehicle" element={<OwnerVehicle />} />
          <Route path="/owner/bookings" element={<OwnerBooking />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
          <Route path="/owner/support" element={<OwnerSupport />} />

          {/* Admin Routes */}
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
        <Route
          path="*"
          element={
            role === "owner" ? <OwnerNotFound /> :
              role === "admin" ? <AdminNotFound /> :
                <NotFound />
          }
        />
      </Routes>

      {/* ChatBot only for student and staff */}
      {showChatBot && (
        <div className="fixed bottom-5 right-5 z-50 w-[350px] md:w-[400px]">
          <ChatBot />
        </div>
      )}

      {renderFooter()}
    </>
  );
}

export default App;