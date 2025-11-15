import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { games, reviews } from "../api";
import StarRating from "../components/StarRating";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const g = await games.get(id);
      setGame(g);
      const r = await reviews.listByGame(id);
      setReviewList(r);
    }
    fetchData();
  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.cover} alt={game.title} />
      <StarRating rating={game.rating} />
      <Link to={`/edit-game/${game._id}`}>
        <button>Editar Juego</button>
      </Link>

      <h2>Reseñas</h2>
      {reviewList.map(r => (
        <div key={r._id}>
          <p>{r.text}</p>
          <StarRating rating={r.rating} />
        </div>
      ))}
    </div>
  );
}
