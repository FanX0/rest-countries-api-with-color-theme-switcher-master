import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Country from "./Country.tsx";
import CountryDetail from "./CountryDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/:name" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
