import React, { useState } from "react";
import axios from "axios";
import { games, reviews } from "../src/api";

const API = process.env.REACT_APP_API_URL;
export default function FormularioReseña({ gameId, onClose, onSaved }) {
 const [form, setForm] = useState({
 author: "",
 stars: 0,
 content: "",
 });
 const handleChange = (e) => {
 setForm({
 ...form,
 [e.target.name]:
 e.target.name === "stars" ? Number(e.target.value) : e.target.value,
 });
 };
 const enviarReseña = async (e) => {
 e.preventDefault();
 try {
 await axios.post(`${API}/reviews/${gameId}`, form);
 onSaved(); // recargar lista de reseñas
 onClose(); // cerrar modal
 } catch (error) {
 console.log("Error al enviar reseña:", error);
 }
 };
 return (
 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
 <div className="bg-white p-6 rounded-xl shadow-lg w-96">
 <h2 className="text-2xl font-semibold text-purple-700 mb-4">
 Nueva Reseña
 </h2>
 <form onSubmit={enviarReseña}>
 {/* AUTOR */}
 <label className="block mb-2 font-medium">Autor</label>
 <input
 type="text"
 name="author"
 placeholder="Tu nombre"
 className="w-full border p-2 rounded mb-4"
 value={form.author}
 onChange={handleChange}
 />
 {/* ESTRELLAS */}
 <label className="block mb-2 font-medium">Puntuación</label>
 <select
 name="stars"
 className="w-full border p-2 rounded mb-4"
 value={form.stars}
 onChange={handleChange}
 required
 >
 <option value="">Selecciona </option>
 <option value="1"> 1</option>
 <option value="2"> 2</option>
 <option value="3"> 3</option>
 <option value="4"> 4</option>
 <option value="5"> 5</option>
 </select>
 {/* CONTENIDO */}
 <label className="block mb-2 font-medium">Comentario</label>
 <textarea
 name="content"
 className="w-full border p-2 rounded mb-4"
 placeholder="Escribe tu opinión..."
 rows="3"
 value={form.content}
 onChange={handleChange}
 />
 {/* BOTONES */}
 <div className="flex justify-between mt-4">
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
 >
 Cancelar
 </button>
 <button
 type="submit"
 className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
 >
 Guardar Reseña
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}