import React, { useState, useEffect } from "react";
import axios from "axios";

function GameDetails({ match }) {
  console.log(match)
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let gameUrl = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=${match.params.gameId}`;
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
  }, []);

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2 >{gameDetails.teams[0].team.displayName} vs {gameDetails.teams[1].team.displayName}</h2>
      {/* ... other details */}
    </div>
  );
}

export default GameDetails;


