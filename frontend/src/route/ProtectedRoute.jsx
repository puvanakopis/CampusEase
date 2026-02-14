import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ALLOWED_PATHS = {
  admin: [
    "/admin/dashboard",
    "/admin/accommodation",
    "/admin/vehicles",
    "/admin/owner",
    "/admin/users",
    "/admin/bookings",
    "/admin/profile",
    "/admin/support",
  ],
  owner: [
    "/owner/",
    "/owner/dashboard",
    "/owner/accommodation",
    "/owner/vehicle",
    "/owner/bookings",
    "/owner/profile",
    "/owner/settings",
    "/owner/support",
  ],
  student: [
    "/",
    "/contact",
    "/about",
    "/accommodation",
    "/accommodation/:id",
    "/vehicle",
    "/vehicle/:id",
    "/owner/:id",
    "/booking",
    "/payment",
    "/profile",
    "/my-bookings",
    "/saved-items",
    "/settings",
    "/support",
  ],
  staff: [
    "/",
    "/contact",
    "/about",
    "/accommodation",
    "/accommodation/:id",
    "/vehicle",
    "/vehicle/:id",
    "/owner/:id",
    "/booking",
    "/payment",
    "/profile",
    "/my-bookings",
    "/saved-items",
    "/settings",
    "/support",
  ],
  guest: [
    "/login",
    "/register",
    "/forgot-password",
    "/",
    "/contact",
    "/about",
    "/accommodation",
    "/accommodation/:id",
    "/vehicle",
    "/vehicle/:id",
  ],
};

const ProtectedRoute = ({ role }) => {
  const location = useLocation();

  const allowedPaths = ALLOWED_PATHS[role] || [];

  const isAllowed = allowedPaths.some(path => {
    const regexPath = new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");
    return regexPath.test(location.pathname);
  });

  if (isAllowed) {
    return <Outlet />;
  } else {
    if (role === "owner") return <Navigate to="/owner/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "student" || role === "staff") return <Navigate to="/" replace />;
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;