// src/App.js
import './App.css';

import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameDetails from "./GameDetails";
const Scoreboard = React.lazy(() => import('./Scoreboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Scoreboard />} />
          <Route path="/:gameId" element={<GameDetails />} />
        </Routes>
      </Suspense>
    </Router>
  
  );
}

export default App;