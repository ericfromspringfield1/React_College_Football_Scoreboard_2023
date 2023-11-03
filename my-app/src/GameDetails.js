import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GameDetails() {
  const [gameDetails, setGameDetails] = useState(null);
  const { gameId } = useParams();
  console.log(gameId);

  
  useEffect(() => {
    let gameUrl = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=${gameId}`;
    const fetchData = async () => {
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
  // const weather = gameDetails.gameInfo.weather.temperature
  const city = gameDetails.gameInfo.venue.address.city
  const state = gameDetails.gameInfo.venue.address.state

  const awayLogo = gameDetails.boxscore.teams[0].team.logo
  const awayAltLogo = gameDetails.header.competitions[0].competitors[1].team.logos[1].href
  const awayTeam = gameDetails.header.competitions[0].competitors[1].team.displayName 
  const awayScore = gameDetails.header.competitions[0].competitors[1].score
  const awayColor = gameDetails.header.competitions[0].competitors[1].team.color
  const awayRecord = gameDetails.header.competitions[0].competitors[1].record[0].displayValue
  const awayConferenceRecord = gameDetails.header.competitions[0].competitors[1].record[1].displayValue
  const awayRank = gameDetails.header.competitions[0].competitors[1].rank


  const homeLogo = gameDetails.boxscore.teams[1].team.logo
  const homeAltLogo = gameDetails.header.competitions[0].competitors[0].team.logos[1].href
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
      {/* <img src={venuePhoto2} alt={venue}></img> */}
      <h2 style={{marginBottom: "0", textAlign: "center"}}> <img src={awayLogo} width={"100"} height={"100"} align={"center"} alt="teamLogo"></img> {dateTime} | {network} <img src={homeLogo} width={"100"} height={"100"} align={"center"} alt="teamLogo"></img></h2> 
      <hr style={{color: awayTeamColor, borderBlockColor: awayTeamColor}}></hr>
      <hr style={{color: awayTeamColor, borderBlockColor: awayTeamColor}}></hr>
      <h2 style={{textAlign: "center", backgroundColor: homeTeamColor, padding: "20px", color: "whitesmoke", fontSize: "2em"}}>{venue} | {city}, {state}</h2>
      <hr style={{color: awayTeamColor, borderBlockColor: awayTeamColor}}></hr>
      <hr style={{color: awayTeamColor, borderBlockColor: awayTeamColor}}></hr>

      <h2 style={{color: awayTeamColor, marginLeft: "5%"}} className="awayTeamGame">({awayRecord}, {awayConferenceRecord}) {awayRank} {awayTeam} {awayScore}</h2>
      <hr style={{color: awayTeamColor, borderBlockColor: awayTeamColor}}></hr>

      <hr style={{color: homeTeamColor, borderBlockColor: homeTeamColor}}></hr>
      <h2 style={{color: homeTeamColor, marginLeft: "5%"}} className="homeTeamGame">({homeRecord}, {homeConferenceRecord}) {homeRank} {homeTeam} {homeScore}</h2>
      <hr style={{color: homeTeamColor, borderBlockColor: homeTeamColor}}></hr>
      <hr style={{color: homeTeamColor, borderBlockColor: homeTeamColor}}></hr>

      {/* ... other details */}
    </div>
  );
}

export default GameDetails;


