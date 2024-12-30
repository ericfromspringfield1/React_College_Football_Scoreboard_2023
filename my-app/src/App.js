// Updated src/App.js to incorporate state management for updating only changed elements
import './App.css';

import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameDetails from "./GameDetails";
const Scoreboard = React.lazy(() => import('./Scoreboard'));

function App() {
  const [games, setGames] = useState([]); // State for game data

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('/api/games'); // Replace with actual API endpoint
      const data = await response.json();
      setGames(data); // Update state with new data
    };

    const interval = setInterval(fetchGames, 5000); // Poll API every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const updateGameScore = (updatedGame) => {
    // Update only the game that changed
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === updatedGame.id ? { ...game, ...updatedGame } : game
      )
    );
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route 
            path="/" 
            element={<Scoreboard games={games} updateGameScore={updateGameScore} />} 
          />
          <Route path="/:gameId" element={<GameDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
