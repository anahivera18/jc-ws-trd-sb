import React, { useState } from "react";
import { games, reviews } from "../api";

export default function TarjetaJuego({ juego, onUpdated, onRemoved, onEdit }){
  const [updating, setUpdating] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const toggleStatus = async () => {
    setUpdating(true);
    try {
      const nuevoStatus = juego.status === "completado" ? "en-progreso" : "completado";
      const updated = await games.update(juego._id, { status: nuevoStatus });
      onUpdated && onUpdated(updated);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar estado");
    } finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este juego?")) return;
    try {
      await games.remove(juego._id);
      onRemoved && onRemoved(juego._id);
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="card-juego">
      <div className="card-left">
        <img src={juego.imageUrl || "/placeholder.png"} alt={juego.title} />
      </div>
      <div className="card-body">
        <h3>{juego.title}</h3>
        <p className="sub">{juego.subtitle}</p>
        <div className="meta">
          <span>{juego.platform}</span> • <span>{juego.genre}</span> • <span>{juego.year}</span>
        </div>
        <div className="actions">
          <button onClick={toggleStatus} disabled={updating}>
            {juego.status === "completado" ? "Completado ✔" : "En progreso ⏳"}
          </button>
          <button onClick={()=> onEdit && onEdit(juego)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
          <button onClick={()=> setShowReviews(s => !s)}>{showReviews ? "Ocultar reseñas" : "Ver reseñas"}</button>
        </div>
        <div className="rating">{(juego.rating||0).toFixed(1)} ⭐</div>
      </div>

      {showReviews && (
        <details>
          <summary>Reseñas</summary>
          <div style={{marginTop:10}}>
            <p>Reseñas (ver página específica para CRUD de reseñas)</p>
          </div>
        </details>
      )}
    </div>
  );
}
