import { useEffect, useState } from "react";
import { games } from "../api";
import GameCard from "../components/CartaJuegos";
import { Link } from "react-router-dom";

export default function Home() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await games.list();
      setGameList(data);
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Mi Biblioteca</h1>
      <Link to="/add-game">
        <button>Agregar Juego</button>
      </Link>
      <Link to="/stats">
        <button>Estadísticas</button>
      </Link>
      <div className="game-list">
        {gameList.map(game => <GameCard key={game._id} game={game} />)}
      </div>
    </div>
  );
}
