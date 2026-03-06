import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AccommodationProvider } from "./context/AccommodationContext";
import { VehicleProvider } from "./context/VehicleContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AccommodationProvider>
          <VehicleProvider>
            <App />
          </VehicleProvider >
        </AccommodationProvider >
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);