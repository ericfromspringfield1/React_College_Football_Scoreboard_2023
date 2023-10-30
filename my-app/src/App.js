// src/App.js
import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scoreboard from "./Scoreboard";
import GameDetails from "./GameDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scoreboard />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

