import React, { useEffect, useState } from "react";
import { games } from "../api";

export default function Estadisticas(){
  const [stats, setStats] = useState({ totalGames: 0, completed: 0, hours: 0, avgRating: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const s = await games.stats();
        setStats(s);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2>Estadísticas</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-label">Juegos totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.hours}h</div>
          <div className="stat-label">Horas jugadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgRating}</div>
          <div className="stat-label">Promedio</div>
        </div>
      </div>
    </div>
  );
}
