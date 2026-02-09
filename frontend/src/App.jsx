import "./App.css";
import { Routes, Route } from "react-router-dom";

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
import NotFound from "./pages/user/NotFound";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/owner/:id" element={<Owner />} />
        <Route path="/booking" element={<Booking />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;