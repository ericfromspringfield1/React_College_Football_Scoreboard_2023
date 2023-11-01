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
        setGameDetails(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchData();
  }, [gameId]);

  // variables for properties like team name, score, etc. 
  if (!gameDetails) return <div>Loading...</div>;
  const awayTeam = gameDetails.header.competitions[0].competitors[1].team.displayName 
  const awayScore = gameDetails.header.competitions[0].competitors[1].score
  const awayColor = gameDetails.header.competitions[0].competitors[1].team.color
  const homeTeam = gameDetails.header.competitions[0].competitors[0].team.displayName
  const homeScore = gameDetails.header.competitions[0].competitors[0].score
  const homeColor = gameDetails.header.competitions[0].competitors[0].team.color
  const awayLogo = gameDetails.boxscore.teams[0].team.logo
  const homeLogo = gameDetails.boxscore.teams[1].team.logo
  const awayTeamColor = `#${awayColor}`
  const homeTeamColor = `#${homeColor}`
  
  return (
    
    <div>
      <h2 style={{color: awayTeamColor}} className="awayTeamGame"><img src={awayLogo} width={"45"} height={"45"} align={"center"} alt="teamLogo"></img> {awayTeam} {awayScore}</h2>
      <h2 style={{color: homeTeamColor}} className="homeTeamGame"><img src={homeLogo} width={"45"} height={"45"} align={"center"} alt="teamLogo"></img>{homeTeam} {homeScore}</h2>
      {/* ... other details */}
    </div>
  );
}

export default GameDetails;


