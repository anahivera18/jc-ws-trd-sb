import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BibliotecaPage from "./pages/BibliotecaPage";
import Estadisticas from "./components/Estadisticas";

export default function App(){
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "1");

  useEffect(() => {
    localStorage.setItem("dark", dark ? "1" : "0");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <div className={`app-root ${dark ? "dark" : ""} min-h-screen`}>
        <header className="site-header">
          <h1>GameTracker</h1>
          <nav>
            <Link to="/" className="nav-link">Biblioteca</Link>
            <Link to="/stats" className="nav-link">Estadísticas</Link>
          </nav>
          <div>
            <button onClick={() => setDark(!dark)} className="btn-toggle">
              {dark ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<BibliotecaPage />} />
            <Route path="/stats" element={<Estadisticas />} />
          </Routes>
        </main>

        <footer className="site-footer">
          Proyecto Final — GameTracker
        </footer>
      </div>
    </BrowserRouter>
  );
}
