import React, { useEffect, useState } from 'react';
import { games as gamesApi } from '../src/api';
import TarjetaJuego from '../components/TarjetaJuego';
import FormularioJuego from '../components/FormularioJuego';
import Estadisticas from '../components/Estadisticas';
export default function BibliotecaPage(){
 const [games, setGames] = useState([]);
 const [editing, setEditing] = useState(null);
 const fetch = ()=> gamesApi.list().then(setGames);
 useEffect(()=> fetch(), []);
 const handleCreate = async (data) => {
 await gamesApi.create(data);
 fetch();
 setEditing(null);
 };
 const handleUpdate = async (id, data) => { await gamesApi.update(id, data); fetch();
setEditing(null); };
 const handleDelete = async (id) => { if(confirm('Eliminar?')) { await gamesApi.remove(id);
fetch(); } };
 return (
 <main className="contenedor">
 <Estadisticas />
 <h2 style={{color:'#6b3aa6', textAlign:'center'}}> Tu Biblioteca de Juegos</h2>
 <div className="grid grid-2">
 {games.map(g => <TarjetaJuego key={g._id} game={g} onEdit={() => setEditing(g)}
onDelete={handleDelete} onOpenReviews={() => { /* abrir modal reseñas */ }} />)}
 </div>
 {editing && (
 <div className="modal">
 <FormularioJuego initial={editing} onSubmit={(data)=> handleUpdate(editing._id, data)}
onCancel={()=>setEditing(null)} />
 </div>
 )}
 </main>
 );
}