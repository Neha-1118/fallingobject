import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [playerPosition, setPlayerPosition] = useState(160);
  const [objectTop, setObjectTop] = useState(0);
  const [objectLeft, setObjectLeft] = useState(Math.random() * 370);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [isGameOver, setIsGameOver] = useState(false);

  const catchSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-video-game-bonus-2044.mp3");
  const gameOverSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.wav");

  // Move player with arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerPosition((prev) => Math.max(prev - 20, 0));
      }
      if (e.key === "ArrowRight") {
        setPlayerPosition((prev) => Math.min(prev + 20, 320));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setObjectTop((prev) => prev + speed);
    }, 20);

    return () => clearInterval(interval);
  }, [speed, isGameOver]);

  // Collision detection
  useEffect(() => {
    if (objectTop > 540) {
      if (
        objectLeft > playerPosition - 30 &&
        objectLeft < playerPosition + 80
      ) {
        catchSound.play();
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore % 5 === 0) {
            setSpeed((s) => s + 0.5);
          }
          return newScore;
        });
        setObjectTop(0);
        setObjectLeft(Math.random() * 370);
      } else {
        gameOverSound.play();
        setIsGameOver(true);
      }
    }
  }, [objectTop]);

  const restartGame = () => {
    setScore(0);
    setSpeed(2);
    setObjectTop(0);
    setObjectLeft(Math.random() * 370);
    setIsGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="score-board">Score: {score}</div>

      <div
        className="player"
        style={{ left: `${playerPosition}px` }}
      ></div>

      {!isGameOver && (
        <div
          className="falling-object"
          style={{ top: `${objectTop}px`, left: `${objectLeft}px` }}
        ></div>
      )}

      {isGameOver && (
        <>
          <div className="game-over">GAME OVER</div>
          <button className="restart-btn" onClick={restartGame}>
            Restart
          </button>
        </>
      )}
    </div>
  );
}

export default App;