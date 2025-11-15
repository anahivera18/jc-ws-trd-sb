import React from 'react';
import { games, reviews } from "../src/api";

export default function TarjetaJuego({ game, onEdit, onDelete, onOpenReviews }) {
 return (
 <div className="tarjeta-juego">
 <img src={game.imageUrl || '/placeholder.jpg'} alt={game.title} className="tarjetaimagen" />
 <div className="tarjeta-contenido">
 <div>
 <h3 className="tarjeta-titulo">{game.title}</h3>
 <p className="tarjeta-subtitulo">{game.subtitle}</p>
 <div className="rating-container">
 <div className="estrellas">
 {Array.from({length:5}).map((_,i) => (
 <span key={i} className={`estrella ${i < Math.round(game.rating) ? 'activa' :
''}`}> </span>
 ))}
 </div>
 <div className="puntuacion-texto">{game.rating?.toFixed(1) || '0.0'} / 5.0</div>
 </div>
 <div className="info-juego">
 <div className="info-fila">
 <span className="info-etiqueta">Estado:</span>
 <span className="info-valor">
 <span className={`estado-badge ${game.status==='completado' ? 'completado' : 'enprogreso'}`}>
 {game.status.toUpperCase()}
 </span>
 </span>
 </div>
 <div className="info-fila">
 <span className="info-etiqueta">Plataforma:</span>
 <span className="info-valor">{game.platform}</span>
 </div>
 <div className="info-fila">
 <span className="info-etiqueta">Horas:</span>
 <span className="info-valor">{game.hoursPlayed} horas</span>
 </div>
 </div>
 </div>
 <div className="tarjeta-acciones">
 <button className="btn btn-secundario btn-sm" onClick={() => onEdit(game)}>
Editar</button>
 <button className="btn btn-peligro btn-sm" onClick={() => onDelete(game._id)}>
Eliminar</button>
 <button className="btn btn-lila btn-sm" onClick={() => onOpenReviews(game)}>
Reseñas</button>
 </div>
 </div>
 </div>
 );
}
