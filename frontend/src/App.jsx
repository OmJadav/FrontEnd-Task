import "./App.css";
import { Footer } from "./Components/Footer";
import { Loginpage } from "./Components/Loginpage";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./Components/Home";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Components/PageNotFound";
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
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Loginpage />} />
        <Route
          path="*"
          element={
            <>
              <PageNotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
