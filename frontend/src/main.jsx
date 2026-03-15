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
import { TempBookingProvider } from "./context/TempBookingContext";
import { RagProvider } from "./context/RagContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RagProvider>
          <AccommodationProvider>
            <VehicleProvider>
              <OwnerProvider>
                <UserProvider>
                  <SaveItemProvider>
                    <BookingProvider>
                      <TempBookingProvider>
                        <App />
                      </TempBookingProvider >
                    </BookingProvider >
                  </SaveItemProvider >
                </UserProvider >
              </OwnerProvider >
            </VehicleProvider >
          </AccommodationProvider >
        </RagProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);