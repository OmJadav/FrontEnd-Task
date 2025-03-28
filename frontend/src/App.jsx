import "./App.css";
import { Footer } from "./Components/Footer";
import { Loginpage } from "./Components/Loginpage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./Components/Home";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <>
      {" "}
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
