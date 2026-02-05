import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/user/Navbar";
import Home from "./pages/user/Home";
;

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;