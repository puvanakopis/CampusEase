import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

import Home from "./pages/user/Home";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;