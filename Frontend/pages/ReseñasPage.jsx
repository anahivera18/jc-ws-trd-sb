import { useState, useEffect } from "react";
import { reviews } from "../api";
import { useParams } from "react-router-dom";

export default function ReviewsPage() {
  const { id: gameId } = useParams();
  const [listaReviews, setListaReviews] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviews.listByGame(gameId);
      setListaReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async () => {
    if (!texto) return;
    try {
      const nueva = await reviews.create(gameId, { content: texto });
      setListaReviews([...listaReviews, nueva]);
      setTexto("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviews.remove(reviewId);
      setListaReviews(listaReviews.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Reseñas del juego</h2>
      <div>
        {listaReviews.map(r => (
          <div key={r._id}>
            <p>{r.content}</p>
            <button onClick={() => handleDelete(r._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <textarea 
        value={texto} 
        onChange={(e) => setTexto(e.target.value)} 
        placeholder="Escribe tu reseña"
      />
      <button onClick={handleAddReview}>Agregar reseña</button>
    </div>
  );
}
