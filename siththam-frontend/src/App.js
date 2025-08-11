import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import UploadPainting from "./pages/UploadPainting";
import ArtistLogin from "./pages/ArtistLogin";
import ArtistRegister from "./pages/ArtistRegister";

function AppLayout() {
  const location = useLocation();

  
  const hideNavbarRoutes = ["/login", "/register","/upload"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<UploadPainting />} />
        <Route path="/login" element={<ArtistLogin />} />
        <Route path="/register" element={<ArtistRegister />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
