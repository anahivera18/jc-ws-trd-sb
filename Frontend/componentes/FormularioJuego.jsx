import React, { useState, useEffect } from 'react';
import { games, reviews } from "../src/api";

export default function FormularioJuego({ initial = {}, onSubmit, onCancel }) {
 const [form, setForm] = useState({
 title: '', subtitle:'', genre:'', platform:'', year:2023, hoursPlayed:0, imageUrl:'', status:'enprogreso', rating:0
 });
 useEffect(()=> { if(initial.title) setForm({...form, ...initial}); }, [initial]);
 const handle = (e) => {
 const { name, value } = e.target;
 setForm(f => ({...f, [name]: name==='hoursPlayed' || name==='year' ? Number(value) :
value}));
 };
 return (
 <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
 {/* Reúsa las clases de la plantilla para inputs */}
 <div className="grupo-form">
 <label className="etiqueta-form">Título</label>
 <input className="control-form" name="title" value={form.title} onChange={handle}
required />
 </div>
 {/* Añade los campos necesarios (platform, year, hoursPlayed, etc.) */}
 <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:20}}>
 <button type="button" className="btn btn-secundario"
onClick={onCancel}>Cancelar</button>
 <button type="submit" className="btn btn-lila">Guardar</button>
 </div>
 </form>
 );
}