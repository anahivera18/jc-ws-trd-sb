import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.cover} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Rating: {game.rating} ⭐</p>
      <Link to={`/game/${game._id}`}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
}
