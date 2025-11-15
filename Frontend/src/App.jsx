import React from "react";
import BibliotecaJuegos from "../pages/BibliotecaJuegos";
export default function App() {
 return (
 <div className="min-h-screen bg-gray-100">
 {/* ENCABEZADO */}
 <header className="bg-purple-700 text-white py-4 shadow-md">
 <h1 className="text-center text-3xl font-bold"> GameTracker</h1>
 </header>
 {/* CONTENIDO PRINCIPAL */}
 <main className="p-6">
 <BibliotecaJuegos />
 </main>
 {/* FOOTER */}
 <footer className="text-center py-4 text-gray-600">
 Proyecto Final — Desarrollo Web
 </footer>
 </div>
 );
}