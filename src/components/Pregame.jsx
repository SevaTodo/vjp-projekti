import { Link } from "react-router-dom";
import "./Pregame.css";

function Pregame({ title, subtitle, playLink, leaderboard }) {
  return (
    <div className="pregame-container">
      {/* Header */}
      <div className="header-text">
        <h1 className="title">{title}</h1>
        <p className="subtitle" style={{ whiteSpace: "pre-line" }}>{subtitle}</p>
      </div>

      <div className="play-leaderboard-row">
        {/* Play Button */}
        <Link to={playLink} className="play-button-link">
          <div className="play-button">
            <span className="play-text">PELAA</span>
          </div>
        </Link>

        {/* Leaderboard */}
        <div className="leaderboard">
          <ol className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {entry.name} - {entry.points}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Pregame;
