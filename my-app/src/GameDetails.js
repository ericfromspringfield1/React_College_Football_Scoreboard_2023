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
  const venue = gameDetails.gameInfo.venue.fullName
  // const venuePhoto = gameDetails.gameInfo.venue.images[0].href
  const venuePhoto2 = gameDetails?.gameInfo?.venue?.images[1]?.href
  const dateTime = gameDetails.header.competitions[0].status.type.detail
  const network = gameDetails.header.competitions[0].broadcasts[0].media.shortName

  const awayLogo = gameDetails.boxscore.teams[0].team.logo
  const awayTeam = gameDetails.header.competitions[0].competitors[1].team.displayName 
  const awayScore = gameDetails.header.competitions[0].competitors[1].score
  const awayColor = gameDetails.header.competitions[0].competitors[1].team.color
  const awayRecord = gameDetails.header.competitions[0].competitors[1].record[0].displayValue
  const awayConferenceRecord = gameDetails.header.competitions[0].competitors[1].record[1].displayValue
  const awayRank = gameDetails.header.competitions[0].competitors[1].rank


  const homeLogo = gameDetails.boxscore.teams[1].team.logo
  const homeTeam = gameDetails.header.competitions[0].competitors[0].team.displayName
  const homeScore = gameDetails.header.competitions[0].competitors[0].score
  const homeColor = gameDetails.header.competitions[0].competitors[0].team.color
  const homeRecord = gameDetails.header.competitions[0].competitors[0].record[0].displayValue
  const homeConferenceRecord = gameDetails.header.competitions[0].competitors[0].record[1].displayValue
  const homeRank = gameDetails.header.competitions[0].competitors[0].rank
  
  const awayTeamColor = `#${awayColor}`
  const homeTeamColor = `#${homeColor}`
  
  return (
    
    <div>
      <h2>{venue} {dateTime} {network}</h2>
      <img src={venuePhoto2} alt={venue}></img>
      <h2 style={{color: awayTeamColor}} className="awayTeamGame"><img src={awayLogo} width={"100"} height={"100"} align={"center"} alt="teamLogo"></img>{awayRank} {awayTeam} ({awayRecord}, {awayConferenceRecord}) {awayScore}</h2>
      <h2 style={{color: homeTeamColor}} className="homeTeamGame"><img src={homeLogo} width={"100"} height={"100"} align={"center"} alt="teamLogo"></img>{homeRank} {homeTeam} ({homeRecord}, {homeConferenceRecord}) {homeScore}</h2>
      {/* ... other details */}
    </div>
  );
}

export default GameDetails;


