import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useNavigateTo from "../hooks/useNavigateTo";

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
    "/owner",
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
    "/application",
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
    "/application",
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

const PROTECTED_STUDENT_ROUTES = [
  "/booking",
  "/payment",
  "/profile",
  "/my-bookings",
  "/saved-items",
  "/settings",
  "/support",
  "/application",
];

const ProtectedRoute = ({ role, user }) => {
  const location = useLocation();
  const navigateTo = useNavigateTo();

  useEffect(() => {
    if (!role || !user) {
      if (PROTECTED_STUDENT_ROUTES.some((path) => location.pathname.startsWith(path))) {
        navigateTo("/login");
        return;
      }
    }

    if (role === "owner") {
      const notAvailable = user?.status !== "available";

      if (notAvailable && location.pathname !== "/owner") {
        navigateTo("/owner");
        return;
      }

      if (!notAvailable && location.pathname === "/owner") {
        navigateTo("/owner/dashboard");
        return;
      }
    }

    if (role === "student" || role === "staff") {
      const notAvailable = user?.status !== "available";

      if (
        notAvailable &&
        (location.pathname === "/booking" || location.pathname === "/payment")
      ) {
        navigateTo("/application");
        return;
      }
    }

    const allowedPaths = ALLOWED_PATHS[role] || [];

    const isAllowed = allowedPaths.some((path) => {
      const regexPath = new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");
      return regexPath.test(location.pathname);
    });

    if (!isAllowed) {
      if (role === "owner") navigateTo("/owner/dashboard");
      else if (role === "admin") navigateTo("/admin/dashboard");
      else if (role === "student" || role === "staff") navigateTo("/login");
      else navigateTo("/");
    }
  }, [role, user, location.pathname]);

  return <Outlet />;
};

export default ProtectedRoute;