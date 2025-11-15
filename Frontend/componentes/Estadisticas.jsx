import React, { useEffect, useState } from 'react';
import { games, reviews } from "../src/api";

export default function Estadisticas(){
 const [s, setS] = useState({});
 useEffect(()=> { games.stats().then(setS); }, []);
 
 return (
 <div className="estadisticas-grid">
 <div className="estadistica-card">
 <div className="estadistica-valor valor-lila">{s.totalGames ?? '-'}</div>
 <div className="estadistica-titulo">JUEGOS EN BIBLIOTECA</div>
 </div>
 <div className="estadistica-card">
 <div className="estadistica-valor valor-exito">{s.completed ?? '-'}</div>
 <div className="estadistica-titulo">JUEGOS COMPLETADOS</div>
 </div>
 <div className="estadistica-card">
 <div className="estadistica-valor valor-info">{s.hours ?? '-'}h</div>
 <div className="estadistica-titulo">HORAS JUGADAS</div>
 </div>
 <div className="estadistica-card">
 <div className="estadistica-valor valor-advertencia">{s.avgRating ?? '-'}</div>
 <div className="estadistica-titulo">PUNTUACIÓN PROMEDIO</div>
 </div>
 </div>
 );
}
