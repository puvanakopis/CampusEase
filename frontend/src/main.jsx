import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AccommodationProvider } from "./context/AccommodationContext";
import { VehicleProvider } from "./context/VehicleContext";
import { OwnerProvider } from "./context/OwnerContext";
import { UserProvider } from "./context/UserContext";
import { SaveItemProvider } from "./context/SaveItemContext";
import { BookingProvider } from "./context/BookingContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AccommodationProvider>
          <VehicleProvider>
            <OwnerProvider>
              <UserProvider>
                <SaveItemProvider>
                  <BookingProvider>
                    <App />
                  </BookingProvider >
                </SaveItemProvider >
              </UserProvider >
            </OwnerProvider >
          </VehicleProvider >
        </AccommodationProvider >
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);