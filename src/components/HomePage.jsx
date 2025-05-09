import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import aimIcon from "../images/aim.png";
import spamIcon from "../images/spam.png";
import rhythmIcon from "../images/rhythm.png";

function HomePage() {
  const [aimHighScore, setAimHighScore] = useState("Ei vielä scoreja!");
  const navigate = useNavigate();

  useEffect(() => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard-aim")) || [];
    if (leaderboard.length > 0) {
      const highestScore = leaderboard[0].points;
      const highestScoreUsername = leaderboard[0].name;
      setAimHighScore(`${highestScoreUsername} - ${highestScore}`);
    }
  }, []);

  const handleUnavailable = (e) => {
    e.preventDefault();
    alert("Tämä peli ei vielä ole valmis. Kokeile Aim Challenge!");
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header-text">
        <h1 className="title">Haastegauntlet 😈</h1>
        <p className="subtitle">Good luck...</p>
      </div>

      {/* Game Icons */}
      <div className="game-section">
        {[{
          title: "Aim Challenge",
          score: aimHighScore,
          imageSrc: aimIcon,
          gameLink: "/aimchallenge",
          available: true,
        },
        {
          title: "Spam Challenge",
          score: "Ei vielä scoreja!",
          imageSrc: spamIcon,
          gameLink: "/game2",
          available: false,
        },
        {
          title: "Rhythm Challenge",
          score: "Ei vielä scoreja!",
          imageSrc: rhythmIcon,
          gameLink: "/game3",
          available: false,
        }].map((game, index) => (
          <div key={index} className="game-block">
            <h2 className="game-title">{game.title}</h2>
            <div className="game-content-row">
              {game.available ? (
                <Link to={game.gameLink} className="game-card">
                  <img
                    src={game.imageSrc}
                    alt={`${game.title} Preview`}
                    className="game-image"
                  />
                </Link>
              ) : (
                <a href="/" onClick={handleUnavailable} className="game-card">
                  <img
                    src={game.imageSrc}
                    alt={`${game.title} Preview`}
                    className="game-image"
                  />
                </a>
              )}
              <div className="high-score">
                <div>High Score</div>
                <div>{game.score}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
