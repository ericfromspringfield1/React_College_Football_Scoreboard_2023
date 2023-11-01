import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GameDetails() {
  const [gameDetails, setGameDetails] = useState(null);
  const { gameId } = useParams();
  console.log(gameId);

  useEffect(() => {
    const fetchData = async () => {
      let gameUrl = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=${gameId}`;
      // let gameUrl = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=401520375`;
      try {
        const response = await axios.get(gameUrl);
        setGameDetails(response.data.boxscore);
        console.log(response.data.boxscore)
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchData();
  }, [gameId]);

  // variables for properties like team name, score, etc. 
  if (!gameDetails) return <div>Loading...</div>;
  const awayTeam = gameDetails.teams[0].team.displayName 
  const homeTeam = gameDetails.teams[1].team.displayName
  
  return (
    <div>
      <h2>{awayTeam} vs {homeTeam}</h2>
      {/* ... other details */}
    </div>
  );
}

export default GameDetails;


