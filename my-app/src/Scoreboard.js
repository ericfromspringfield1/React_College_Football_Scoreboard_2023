// src/Scoreboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Scoreboard.css'; 

function Scoreboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const scoreboardURL = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=500&dates=20241230-20250121'
      // const scoreboardURL = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'
      // const scoreboardURL = '/proxy'  *** IF USING FLASK AS BACKEND
      try {
        const response = await axios.get(scoreboardURL);
        setGames(response.data.events);

        // Just call the events array
        console.log(response.data.events)
        
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
  
    fetchData();

    // Fetch Data every 20 seconds 
    const interval=setInterval(()=>{
      fetchData();
      },20000)
 
 
     return()=>clearInterval(interval)
    
 },[])

  // Create list of variables so you can just use the variables instead of writing out homeTeam, etc over and over again.
  return (
    <div className="scoreboard-container">
      {games.map(game => (
        <GameCard key={game.id} 
        homeTeam={game.competitions[0].competitors[0].team.displayName}
        homeScore={game.competitions[0].competitors[0].score} 
        homeColor={game.competitions[0].competitors[0].team.color}
        homeAltColor={game.competitions[0].competitors[0].team.alternateColor}
        homeLogo={game.competitions[0].competitors[0].team.logo}

        awayTeam={game.competitions[0].competitors[1].team.displayName}
        awayScore={game.competitions[0].competitors[1].score}
        awayColor={game.competitions[0].competitors[1].team.color}
        awayAltColor={game.competitions[0].competitors[1].team.color}
        awayLogo={game.competitions[0].competitors[1].team.logo}

        gameId={game.id}
        gameStatus={game.status.type.detail}
        />
      ))}
    </div>
  );
}


function GameCard({ homeTeam, homeScore, homeColor, homeLogo, awayTeam, awayScore, awayColor, awayLogo, gameId, gameStatus }) {
  const homeTeamColor = `#${homeColor}`
  const awayTeamColor = `#${awayColor}`

  return (
    <div className="game-card">
  <div className="game-status">{gameStatus}</div>
  <div className="team-scoreboard awayTeamScoreboard" style={{'--away-color': awayTeamColor}}>
    <img src={awayLogo} className="team-logo" alt="team logo" />
    <span className="team-name-score">{awayTeam} {awayScore}</span>
  </div>
  <div className="team-scoreboard homeTeamScoreboard" style={{'--home-color': homeTeamColor}}>
    <img src={homeLogo} className="team-logo" alt="team logo" />
    <span className="team-name-score">{homeTeam} {homeScore}</span>
  </div>
  <Link to={`/${gameId}`}>
    <button className="view-details-button">View Details</button>
  </Link>
</div>
  );
}
export default Scoreboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Scoreboard() {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const scoreboardURL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';
//       try {
//         const response = await axios.get(scoreboardURL);
//         setGames(response.data.events); // Store only the 'events' array in the games state
//       } catch (error) {
//         console.error("Error fetching games:", error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   return (
//     <div>
//       This should be a list of the away teams in this week's games:
//       {games.map(game => (
//         <GameCard key={game.id} awayTeam={game.competitions[0].competitors[0].team.displayName} />
//       ))}
//     </div>
//   );
// }

// function GameCard({ awayTeam }) {
//   return (
//     <div>
//       <h3>{awayTeam}</h3>
//       {/* ... other details */}
//       {/* If you also have a game ID or link, you can uncomment the next line */}
//       {/* <a href={`/game/${game.id}`}>View Details</a> */}
//     </div>
//   );
// }

//export default Scoreboard

