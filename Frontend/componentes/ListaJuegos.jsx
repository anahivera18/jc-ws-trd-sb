import React, { useEffect, useState } from 'react';
import { games } from '../api';
import GameCard from './GameCard';

const GameList = () => {
  const [gameList, setGameList] = useState([]);
  const [newGame, setNewGame] = useState({ title: '', cover: '', rating: 0, completed: false, hoursPlayed: 0 });

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const data = await games.list();
    setGameList(data);
  };

  const handleGameCreate = async (e) => {
    e.preventDefault();
    if (!newGame.title || !newGame.cover) return alert('Título y portada son obligatorios');

    const created = await games.create(newGame);
    setGameList([...gameList, created]);
    setNewGame({ title: '', cover: '', rating: 0, completed: false, hoursPlayed: 0 });
  };

  const handleGameUpdate = (updatedGame) => {
    const updatedList = gameList.map(g => g._id === updatedGame._id ? updatedGame : g);
    setGameList(updatedList);
  };

  const handleGameDelete = async (id) => {
    await games.remove(id);
    setGameList(gameList.filter(g => g._id !== id));
  };

  return (
    <div>
      <h2>Mi Biblioteca de Juegos</h2>

      {/* Formulario para agregar nuevo juego */}
      <form onSubmit={handleGameCreate} className="new-game-form">
        <input
          placeholder="Título del juego"
          value={newGame.title}
          onChange={e => setNewGame({ ...newGame, title: e.target.value })}
          required
        />
        <input
          placeholder="URL de portada"
          value={newGame.cover}
          onChange={e => setNewGame({ ...newGame, cover: e.target.value })}
          required
        />
        <button type="submit">Agregar Juego</button>
      </form>

      {/* Lista de juegos */}
      <div className="game-list">
        {gameList.map(juego => (
          <div key={juego._id} className="game-wrapper">
            <GameCard juego={juego} onUpdate={handleGameUpdate} />
            <button onClick={() => handleGameDelete(juego._id)}>Eliminar Juego</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
