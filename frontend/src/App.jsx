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
        <Route path="/" element={<Loginpage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
