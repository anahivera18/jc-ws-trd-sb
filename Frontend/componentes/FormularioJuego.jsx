import React, { useEffect, useState } from "react";
import { games } from "../api";

export default function FormularioJuego({ editing, onClose }){
  const [form, setForm] = useState({
    title: "", subtitle: "", genre: "", platform: "", year: 2024, hoursPlayed: 0, imageUrl: "", status: "en-progreso", rating: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) setForm({
      title: editing.title || "",
      subtitle: editing.subtitle || "",
      genre: editing.genre || "",
      platform: editing.platform || "",
      year: editing.year || new Date().getFullYear(),
      hoursPlayed: editing.hoursPlayed || 0,
      imageUrl: editing.imageUrl || "",
      status: editing.status || "en-progreso",
      rating: editing.rating || 0
    });
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await games.update(editing._id, form);
        alert("Juego actualizado");
      } else {
        await games.create(form);
        alert("Juego creado");
      }
      onClose && onClose();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    } finally { setSaving(false); }
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{editing ? "Editar Juego" : "Agregar juego"}</h3>
        <input required placeholder="Título" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input placeholder="Subtítulo" value={form.subtitle} onChange={e=>setForm({...form, subtitle:e.target.value})} />
        <input placeholder="Género" value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} />
        <input placeholder="Plataforma" value={form.platform} onChange={e=>setForm({...form, platform:e.target.value})} />
        <input type="number" placeholder="Año" value={form.year} onChange={e=>setForm({...form, year:Number(e.target.value)})} />
        <input type="number" placeholder="Horas jugadas" value={form.hoursPlayed} onChange={e=>setForm({...form, hoursPlayed:Number(e.target.value)})} />
        <input placeholder="URL imagen" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})} />
        <div className="form-actions">
          <button type="button" onClick={()=>onClose && onClose()} className="btn-secondary">Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
        </div>
      </form>
    </div>
  );
}
