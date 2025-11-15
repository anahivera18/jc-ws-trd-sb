import { useEffect, useState } from "react";
import { games } from "../api";

export default function StatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await games.stats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h2>Estadísticas de juegos</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
