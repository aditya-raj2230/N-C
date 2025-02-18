import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis"; // Import Lenis
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.05, smooth: true }}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ReactLenis>
  </StrictMode>
);
