// src/Scoreboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Scoreboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const scoreboardURL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'
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
  }, []);

  // Create list of variables so you can just use the variables instead of writing out homeTeam, etc over and over again.
  return (
    
    <div>
      {games.map(game => (
        <GameCard key={game.id} 
        homeTeam={game.competitions[0].competitors[0].team.displayName} 
        awayTeam={game.competitions[0].competitors[1].team.displayName}
        gameId={game.id}
        />
      ))}
    </div>
  );
}

function GameCard({ awayTeam, homeTeam, gameId }) {
  return (
    <div>
      <h3>{awayTeam} vs {homeTeam}</h3>
      {/* ... other details */}
      {/* If you also have a game ID or link, you can uncomment the next line */}
      <Link to={`/${gameId}`}>View Details</Link>

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

