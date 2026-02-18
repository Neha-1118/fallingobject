import { useEffect, useState } from "react";

function App() {
  const [playerX, setPlayerX] = useState(200);
  const [objectY, setObjectY] = useState(0);
  const [objectX, setObjectX] = useState(Math.random() * 400);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Move player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((prev) => Math.max(prev - 20, 0));
      }
      if (e.key === "ArrowRight") {
        setPlayerX((prev) => Math.min(prev + 20, 400));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Falling object
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObjectY((prev) => prev + 5);
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    if (objectY > 450) {
      if (objectX > playerX - 50 && objectX < playerX + 50) {
        setScore((prev) => prev + 1);
        setObjectY(0);
        setObjectX(Math.random() * 400);
      } else {
        setGameOver(true);
      }
    }
  }, [objectY]);

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "2px solid black",
        margin: "50px auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Score: {score}</h2>

      {gameOver && (
        <h1 style={{ textAlign: "center", color: "red" }}>Game Over</h1>
      )}

      {/* Falling Object */}
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "blue",
          position: "absolute",
          top: objectY,
          left: objectX,
        }}
      ></div>

      {/* Player */}
      <div
        style={{
          width: "100px",
          height: "20px",
          backgroundColor: "green",
          position: "absolute",
          bottom: "0px",
          left: playerX,
        }}
      ></div>
    </div>
  );
}

export default App;
