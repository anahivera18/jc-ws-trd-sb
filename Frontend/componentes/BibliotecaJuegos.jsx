import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetaJuego from "../components/TarjetaJuego";
import FormularioJuego from "../components/FormularioJuego";
import { games, reviews } from "../src/api";

const API = process.env.REACT_APP_API_URL;
export default function BibliotecaJuegos() {
 const [juegos, setJuegos] = useState([]);
 const [mostrarFormulario, setMostrarFormulario] = useState(false);
 const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
 // ================================
 // Cargar juegos desde el backend
 // ================================
 const cargarJuegos = async () => {
 try {
 const res = await axios.get(`${API}/games`);
 setJuegos(res.data);
 } catch (error) {
 console.error("Error al cargar juegos:", error);
 }
 };
 useEffect(() => {
 cargarJuegos();
 }, []);
 // ================================
 // Crear o actualizar un juego
 // ================================
 const guardarJuego = async (datos) => {
 try {
 if (juegoSeleccionado) {
 // EDITAR
 await axios.put(`${API}/games/${juegoSeleccionado._id}`, datos);
 } else {
 // CREAR
 await axios.post(`${API}/games`, datos);
 }
 cargarJuegos();
 cerrarFormulario();
 } catch (error) {
 console.error("Error al guardar:", error);
 }
 };
 // ================================
 // Eliminar juego
 // ================================
 const eliminarJuego = async (id) => {
 try {
 await axios.delete(`${API}/games/${id}`);
 cargarJuegos();
 } catch (error) {
 console.error("Error al eliminar:", error);
 }
 };
 // ================================
 // Abrir formulario para editar
 // ================================
 const editarJuego = (juego) => {
 setJuegoSeleccionado(juego);
 setMostrarFormulario(true);
 };
 // Cerrar formulario
 const cerrarFormulario = () => {
 setJuegoSeleccionado(null);
 setMostrarFormulario(false);
 };
 return (
 <div className="container mx-auto p-6">
 <h1 className="text-4xl font-bold text-purple-700 mb-6">
 Tu Biblioteca de Juegos
 </h1>
 {/* BOTÓN */}
 <button
 onClick={() => setMostrarFormulario(true)}
 className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
 >
 Agregar juego
 </button>
 {/* FORMULARIO */}
 {mostrarFormulario && (
 <FormularioJuego
 juego={juegoSeleccionado}
 onSave={guardarJuego}
 onCancel={cerrarFormulario}
 />
 )}
 {/* LISTADO DE JUEGOS */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
 {juegos.map((j) => (
 <TarjetaJuego
 key={j._id}
 juego={j}
 onDelete={() => eliminarJuego(j._id)}
 onEdit={() => editarJuego(j)}
 />
 ))}
 </div>
 </div>
 );
}