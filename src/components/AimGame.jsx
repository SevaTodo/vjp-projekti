import { useState, useEffect } from "react";
import "./AimGame.css";
import GameOver from "./GameOver";

function AimGame() {
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [circles, setCircles] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const circleSize = window.innerWidth * 0.08;

  const PADDING = 100;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameActive(true);
      generateCircles();
    }
  }, [countdown]);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGameActive(false);
      setCircles([]);
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Hide cursor on mount
    document.body.style.cursor = "none";
    
    // Show cursor back on unmount
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);
  
  useEffect(() => {
    if (!gameActive && countdown === 0 && timeLeft === 0) {
      document.body.style.cursor = "default";
    }
  }, [gameActive, countdown, timeLeft]);
  
  

  function generateCircles() {
    const maxWidth = window.innerWidth - circleSize - PADDING * 2;
    const maxHeight = window.innerHeight - circleSize - PADDING * 2;

    const newCircles = [];
    for (let i = 0; i < 2; i++) {
    newCircles.push({
        id: Math.random(),
        x: PADDING + Math.random() * maxWidth,
        y: PADDING + Math.random() * maxHeight,
    });
    }
    setCircles(newCircles);
  }

  function handleCircleClick(id) {
    if (!gameActive) return;
    setScore(prev => prev + 10);
    const maxWidth = window.innerWidth - circleSize - PADDING * 2;
    const maxHeight = window.innerHeight - circleSize - PADDING * 2;
    setCircles(prev => prev.filter(circle => circle.id !== id).concat({
    id: Math.random(),
    x: PADDING + Math.random() * maxWidth,
    y: PADDING + Math.random() * maxHeight,
    }));
  }

  function handleMissClick(e) {
    if (!gameActive) return;
    if (e.target.className !== "circle") {
      setScore(prev => prev - 5);
    }
  }

  return (
    <div className="aim-game-container" onPointerDown={handleMissClick}>

      {/* Score */}
      <div className="score">
        Pisteet: {score}
      </div>

      {/* Timer */}
      <div className="timer">
        {gameActive ? `${timeLeft}s` : ""}
      </div>

      {/* Countdown or Game Over */}
      {countdown > 0 && (
        <div className="center-text">{countdown}</div>
      )}
      {!gameActive && countdown === 0 && timeLeft === 0 && (
      <GameOver points={score} gameKey="aim" />
    )}


      {/* Circles */}
      {gameActive && circles.map(circle => (
        <div
          key={circle.id}
          className="circle"
          style={{
            top: circle.y,
            left: circle.x,
            width: circleSize,
            height: circleSize,
          }}
          onPointerDown={() => handleCircleClick(circle.id)}
        />
      ))}
      {gameActive && !('ontouchstart' in window || navigator.maxTouchPoints > 0) && (
      <div
        className="crosshair"
        style={{ top: mousePos.y, left: mousePos.x }}
      />
    )}

    </div>
  );
}

export default AimGame;
