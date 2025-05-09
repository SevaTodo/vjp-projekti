import { useEffect, useState } from "react";
import "./GameOver.css";

function GameOver({ points, gameKey }) {
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [placement, setPlacement] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`leaderboard-${gameKey}`)) || [];
    setLeaderboard(data.slice(0, 5));

    // Calculate placement
    const all = [...data, { name: "", points }];
    const sorted = all.sort((a, b) => b.points - a.points);
    const rank = sorted.findIndex(entry => entry.points === points) + 1;
    setPlacement(rank);
  }, [gameKey, points]);

  const handleSubmit = () => {
    if (submitted || !name.trim()) return;
    const newEntry = { name: name.trim(), points };
    const data = JSON.parse(localStorage.getItem(`leaderboard-${gameKey}`)) || [];
    const updated = [...data, newEntry].sort((a, b) => b.points - a.points).slice(0, 5);
    localStorage.setItem(`leaderboard-${gameKey}`, JSON.stringify(updated));
    setLeaderboard(updated);
    setSubmitted(true);
  };

  return (
    <div className="gameover-wrapper">
      <div className="gameover-card">
        <div className="gameover-title">Peli loppu!</div>

        <div className="gameover-left">
            <div className="gameover-score">
            Sinun pisteet: {points} {placement && `( #${placement} )`}
            </div>
            <div className="gameover-input-row">
            <input
                type="text"
                className="gameover-input"
                placeholder="Syötä nimesi tähän"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitted}
            />
            <button
                className="gameover-submit"
                onClick={handleSubmit}
                disabled={submitted}
            >
                {submitted ? "DONE" : "SUBMIT"}
            </button>
            </div>
        </div>

        <div className="gameover-right">
            <ol className="gameover-leaderboard">
            {leaderboard.map((entry, i) => (
                <li key={i}>{i + 1}. {entry.name} - {entry.points}</li>
            ))}
            </ol>
        </div>
        </div>
    </div>
  );
}

export default GameOver;
