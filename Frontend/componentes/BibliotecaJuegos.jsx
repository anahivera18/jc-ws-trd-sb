import React, { useEffect, useState } from "react";
import { games } from "../api";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";

export default function BibliotecaJuegos(){
  const [juegos, setJuegos] = useState([]);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState({ genre: "", platform: "", status: "" });
  const [orden, setOrden] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const data = await games.list(q);
      setJuegos(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar juegos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGames(); }, [q]);

  const handleUpdateLocal = (updated) => {
    setJuegos(prev => prev.map(j => j._id === updated._id ? updated : j));
  };

  const handleRemoveLocal = (id) => {
    setJuegos(prev => prev.filter(j => j._id !== id));
  };

  const filtered = juegos.filter(j =>
    (filtro.genre === "" || (j.genre || "").toLowerCase() === filtro.genre.toLowerCase()) &&
    (filtro.platform === "" || (j.platform || "").toLowerCase() === filtro.platform.toLowerCase()) &&
    (filtro.status === "" || (j.status || "").toLowerCase() === filtro.status.toLowerCase())
  );

  const sorted = [...filtered].sort((a,b) => {
    if (orden === "az") return a.title.localeCompare(b.title);
    if (orden === "rating") return (b.rating||0) - (a.rating||0);
    if (orden === "hours") return (b.hoursPlayed||0) - (a.hoursPlayed||0);
    return 0;
  });

  return (
    <div>
      <div className="controls">
        <div className="left-controls">
          <input placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
          <select onChange={e=>setFiltro({...filtro, genre: e.target.value})} value={filtro.genre}>
            <option value="">Género</option>
            <option value="Aventura">Aventura</option>
            <option value="Shooter">Shooter</option>
            <option value="RPG">RPG</option>
            <option value="Estrategia">Estrategia</option>
          </select>
          <select onChange={e=>setFiltro({...filtro, platform: e.target.value})} value={filtro.platform}>
            <option value="">Plataforma</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
          <select onChange={e=>setFiltro({...filtro, status: e.target.value})} value={filtro.status}>
            <option value="">Estado</option>
            <option value="completado">Completado</option>
            <option value="en-progreso">En progreso</option>
          </select>
        </div>

        <div className="right-controls">
          <select onChange={e=>setOrden(e.target.value)} value={orden}>
            <option value="">Ordenar</option>
            <option value="az">A–Z</option>
            <option value="rating">Calificación</option>
            <option value="hours">Horas jugadas</option>
          </select>
          <button onClick={()=>{ setEditing(null); setShowForm(true); }} className="btn-primary">Agregar Juego</button>
        </div>
      </div>

      {showForm && <FormularioJuego onClose={()=>{ setShowForm(false); fetchGames(); }} editing={editing} />}

      {loading ? <p>Cargando...</p> :
        <div className="grid-juegos">
          {sorted.map(j => (
            <TarjetaJuego
              key={j._id}
              juego={j}
              onUpdated={handleUpdateLocal}
              onRemoved={handleRemoveLocal}
              onEdit={(game)=>{ setEditing(game); setShowForm(true); }}
            />
          ))}
          {sorted.length === 0 && <p>No hay juegos que coincidan.</p>}
        </div>
      }
    </div>
  );
}
