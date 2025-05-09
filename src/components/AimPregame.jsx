import { useEffect, useState } from "react";
import Pregame from "./Pregame";

function AimPregame() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaderboard-aim")) || [];
    setLeaderboard(data.slice(0, 5)); // Take the top 5
  }, []);

  return (
    <Pregame
      title="Aim Challenge"
      subtitle={"Klikkaa ympyrät nopeesti\nYritä saada 1000!"}
      playLink="/aimchallenge/play"
      leaderboard={leaderboard}
    />
  );
}

export default AimPregame;
