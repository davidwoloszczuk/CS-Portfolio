import React, { useEffect, useState } from 'react';
import '../styles/Packman.css';

const Packman = () => {
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [ghosts, setGhosts] = useState([
    { x: 13, y: 11, xVelocity: 1, yVelocity: 0 },
    { x: 14, y: 11, xVelocity: -1, yVelocity: 0 },
    { x: 13, y: 12, xVelocity: 0, yVelocity: 1 },
    { x: 14, y: 12, xVelocity: 0, yVelocity: -1 }
  ]);

  useEffect(() => {
    const canvas = document.getElementById('pacman');
    const context = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = 28;
    let pacmanX = 14;
    let pacmanY = 23;
    let xVelocity = 0;
    let yVelocity = 0;
    let direction = 'right';

    const maze = [
      // Define the maze layout using a 2D array
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 2, 1],
      [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    const gameLoop = () => {
      const nextX = pacmanX + xVelocity;
      const nextY = pacmanY + yVelocity;

      // Check for collisions with walls and bounds
      if (nextY >= 0 && nextY < maze.length && nextX >= 0 && nextX < maze[nextY].length && maze[nextY][nextX] !== 1) {
        pacmanX = nextX;
        pacmanY = nextY;
      }

      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the maze
      for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
          if (maze[y][x] === 1) {
            context.fillStyle = 'blue';
            context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          } else if (maze[y][x] === 2) {
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize / 6, 0, 2 * Math.PI);
            context.fill();
          }
        }
      }

      context.fillStyle = 'yellow';
      context.beginPath();
      if (direction === 'right') {
        context.arc(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2, gridSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
      } else if (direction === 'left') {
        context.arc(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2, gridSize / 2, 1.2 * Math.PI, 0.8 * Math.PI);
      } else if (direction === 'up') {
        context.arc(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2, gridSize / 2, 1.7 * Math.PI, 1.3 * Math.PI);
      } else if (direction === 'down') {
        context.arc(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2, gridSize / 2, 0.7 * Math.PI, 0.3 * Math.PI);
      }
      context.lineTo(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2);
      context.fill();

      context.fillStyle = 'red';
      const updatedGhosts = ghosts.map(ghost => {
        let newX = ghost.x + ghost.xVelocity;
        let newY = ghost.y + ghost.yVelocity;

        if (newX < 0) newX = tileCount - 1;
        if (newX > tileCount - 1) newX = 0;
        if (newY < 0) newY = tileCount - 1;
        if (newY > tileCount - 1) newY = 0;

        context.fillRect(newX * gridSize, newY * gridSize, gridSize - 2, gridSize - 2);

        if (pacmanX === newX && pacmanY === newY) {
          setScore(0);
          pacmanX = 14;
          pacmanY = 23;
          xVelocity = 0;
          yVelocity = 0;
        }

        return { ...ghost, x: newX, y: newY };
      });

      setGhosts(updatedGhosts);

      if (score > highScore) {
        setHighScore(score);
      }
    };

    const keyDownHandler = (event) => {
      switch (event.keyCode) {
        case 37:
          xVelocity = -1;
          yVelocity = 0;
          direction = 'left';
          break;
        case 38:
          xVelocity = 0;
          yVelocity = -1;
          direction = 'up';
          break;
        case 39:
          xVelocity = 1;
          yVelocity = 0;
          direction = 'right';
          break;
        case 40:
          xVelocity = 0;
          yVelocity = 1;
          direction = 'down';
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    const interval = setInterval(gameLoop, 100);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      clearInterval(interval);
    };
  }, [score, highScore, ghosts]);

  return (
    <>
      <div id="highscore">High Score: {highScore}</div>
      <canvas id="pacman" width="560" height="560"></canvas>
    </>
  );
};

export default Packman;