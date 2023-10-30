// src/Scoreboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function Scoreboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const scoreboardURL = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'
      try {
        const response = await axios.get(scoreboardURL);
        setGames(response.data);
        console.log(setGames(response.data))
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

function GameCard({ game }) {
  return (
    <div>
      <h3>{game.awayTeam} VS {game.homeTeam}</h3>
      {/* ... other details */}
      <a href={`/game/${game.id}`}>View Details</a>
    </div>
  );
}

export default Scoreboard;