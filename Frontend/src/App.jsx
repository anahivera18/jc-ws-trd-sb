import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/BibliotecaPage";
import AddGame from "./pages/AgregarJuego";
import EditGame from "./pages/EditGame";
import GameDetails from "./pages/DetallerJuego";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/edit-game/:id" element={<EditGame />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}
