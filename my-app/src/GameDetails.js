// src/GameDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function GameDetails({ match }) {
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    let gameUrl =  `http://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=}`
      try {
        const response = await axios.get(`${gameUrl}/${match.params.gameId}`);
        setGameDetails(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchData();
  }, [match.params.gameId]);

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div>
      {/* Display game details here */}
      <h2>{gameDetails.awayTeam} VS {gameDetails.homeTeam}</h2>
      {/* ... other details */}
    </div>
  );
}

export default GameDetails;

