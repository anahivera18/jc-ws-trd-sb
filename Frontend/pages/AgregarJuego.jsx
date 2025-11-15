import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { games } from "../api";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await games.create({ title, cover, rating });
    navigate("/"); // volver a biblioteca
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Juego</h2>
      <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="URL de portada" value={cover} onChange={e => setCover(e.target.value)} />
      <input type="number" placeholder="Rating" value={rating} onChange={e => setRating(Number(e.target.value))} />
      <button type="submit">Guardar</button>
    </form>
  );
}
