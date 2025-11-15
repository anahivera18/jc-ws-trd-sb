import React, { useEffect, useState } from 'react';
import { games, reviews } from "../src/api";

export default function ListaReseñas({ gameId }) {
 const [list, setList] = useState([]);
 useEffect(()=> {
 if(!gameId) return;
 reviews.listByGame(gameId).then(setList);
 }, [gameId]);
 return (
 <div>
 <h3>Reseñas</h3>
 {list.map(r => (
 <div key={r._id} style={{padding:10, borderBottom:'1px solid #eee'}}>
 <strong>{r.author}</strong> — {r.stars}
 <p>{r.content}</p>
 </div>
 ))}
 </div>
 );
}