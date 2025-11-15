import React, { useEffect, useState } from 'react';
import { games, reviews } from '../api';
import StarRating from './StarRating';

const GameCard = ({ juego, onUpdate }) => {
  const [completed, setCompleted] = useState(juego.completed);
  const [rating, setRating] = useState(juego.rating);
  const [hours, setHours] = useState(juego.hoursPlayed);
  const [gameReviews, setGameReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', content: '', rating: 0 });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const data = await reviews.listByGame(juego._id);
    setGameReviews(data);
  };

  const toggleCompleted = async () => {
    const updated = await games.update(juego._id, { completed: !completed });
    setCompleted(updated.completed);
    onUpdate(updated);
  };

  const handleRatingChange = async (value) => {
    const updated = await games.update(juego._id, { rating: value });
    setRating(updated.rating);
    onUpdate(updated);
  };

  const handleHoursChange = async (e) => {
    const newHours = parseInt(e.target.value) || 0;
    const updated = await games.update(juego._id, { hoursPlayed: newHours });
    setHours(updated.hoursPlayed);
    onUpdate(updated);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await reviews.create(juego._id, newReview);
    setNewReview({ user: '', content: '', rating: 0 });
    loadReviews();
  };

  const handleReviewDelete = async (id) => {
    await reviews.remove(id);
    loadReviews();
  };

  return (
    <div className="game-card">
      <img src={juego.cover} alt={juego.title} className="cover" />
      <h3>{juego.title}</h3>

      <div>
        <label>
          <input type="checkbox" checked={completed} onChange={toggleCompleted} />
          Completado
        </label>
      </div>

      <div>
        <span>Horas jugadas: </span>
        <input type="number" value={hours} onChange={handleHoursChange} min={0} />
      </div>

      <div>
        <span>Puntuación: </span>
        <StarRating rating={rating} onRate={handleRatingChange} />
      </div>

      <div className="reviews">
        <h4>Reseñas</h4>
        {gameReviews.map(r => (
          <div key={r._id} className="review">
            <strong>{r.user}</strong>: {r.content} ({r.rating}⭐)
            <button onClick={() => handleReviewDelete(r._id)}>Eliminar</button>
          </div>
        ))}

        <form onSubmit={handleReviewSubmit}>
          <input
            placeholder="Tu nombre"
            value={newReview.user}
            onChange={e => setNewReview({ ...newReview, user: e.target.value })}
            required
          />
          <textarea
            placeholder="Escribe tu reseña"
            value={newReview.content}
            onChange={e => setNewReview({ ...newReview, content: e.target.value })}
            required
          />
          <StarRating
            rating={newReview.rating}
            onRate={value => setNewReview({ ...newReview, rating: value })}
          />
          <button type="submit">Agregar reseña</button>
        </form>
      </div>
    </div>
  );
};

export default GameCard;
