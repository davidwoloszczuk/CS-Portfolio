import React, { useEffect, useState, useRef } from 'react';
import '../styles/Packman.css';

const Packman = () => {
    const [highScore, setHighScore] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [ghosts, setGhosts] = useState([
        { x: 13, y: 11, xVelocity: 1, yVelocity: 0, color: 'red' },
        { x: 14, y: 11, xVelocity: -1, yVelocity: 0, color: 'pink' },
        { x: 13, y: 12, xVelocity: 0, yVelocity: 1, color: 'cyan' },
        { x: 14, y: 12, xVelocity: 0, yVelocity: -1, color: 'orange' }
    ]);

    const gridSize = 20;
    const tileCount = 28;
    const initialPacmanX = 14;
    const initialPacmanY = 23;
    const [pacmanX, setPacmanX] = useState(initialPacmanX);
    const [pacmanY, setPacmanY] = useState(initialPacmanY);
    const [nextDirection, setNextDirection] = useState(null); // Use for storing the next direction

    // More accurate maze representation (partial)
    const initialMaze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 2, 1],
        [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 2, 1],
        [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    const [maze, setMaze] = useState(initialMaze);

    const canvasRef = useRef(null); // Ref for the canvas element

    useEffect(() => {
        const canvas = canvasRef.current; // Get canvas using the ref
        const context = canvas.getContext('2d');

        // Set canvas dimensions (adjust as needed)
        canvas.width = tileCount * gridSize;
        canvas.height = tileCount * gridSize;

        const drawMaze = () => {
            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    if (maze[y][x] === 1) {
                        context.fillStyle = '#003399'; // Original Pac-Man blue
                        context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
                    } else if (maze[y][x] === 2) {
                        context.fillStyle = 'white';
                        context.beginPath();
                        context.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize / 6, 0, 2 * Math.PI);
                        context.fill();
                    }
                }
            }
        };

        const drawPacman = () => {
            context.fillStyle = 'yellow'; // Original Pac-Man yellow
            context.beginPath();
            let angleStart = 0;
            let angleEnd = 2 * Math.PI;

            if (nextDirection === 'right') {
                angleStart = 0.2 * Math.PI;
                angleEnd = 1.8 * Math.PI;
            } else if (nextDirection === 'left') {
                angleStart = 1.2 * Math.PI;
                angleEnd = 0.8 * Math.PI;
            } else if (nextDirection === 'up') {
                angleStart = 1.7 * Math.PI;
                angleEnd = 1.3 * Math.PI;
            } else if (nextDirection === 'down') {
                angleStart = 0.7 * Math.PI;
                angleEnd = 0.3 * Math.PI;
            }

            context.arc(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2, gridSize / 2, angleStart, angleEnd);
            context.lineTo(pacmanX * gridSize + gridSize / 2, pacmanY * gridSize + gridSize / 2);
            context.fill();
        };

        const drawGhosts = () => {
            const updatedGhosts = ghosts.map(ghost => {
                let newX = ghost.x + ghost.xVelocity;
                let newY = ghost.y + ghost.yVelocity;

                if (newX < 0) newX = tileCount - 1;
                if (newX > tileCount - 1) newX = 0;
                if (newY < 0) newY = tileCount - 1;
                if (newY > tileCount - 1) newY = 0;

                context.fillStyle = ghost.color; // Use ghost's color
                context.fillRect(newX * gridSize, newY * gridSize, gridSize - 2, gridSize - 2);

                // Collision detection
                if (pacmanX === newX && pacmanY === newY) {
                    setLives(prevLives => prevLives - 1);
                    if (lives <= 1) {
                        setGameOver(true);
                    }
                    resetPacman();
                }

                return { ...ghost, x: newX, y: newY };
            });
            setGhosts(updatedGhosts);
        };

        const resetPacman = () => {
            setPacmanX(initialPacmanX);
            setPacmanY(initialPacmanY);
            setNextDirection(null); // Reset direction
        };

        const gameLoop = () => {
            if (gameOver) {
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = 'red';
                context.font = '30px Arial';
                context.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
                return;
            }

            let newX = pacmanX;
            let newY = pacmanY;

            if (nextDirection === 'left') {
                newX -= 1;
            } else if (nextDirection === 'up') {
                newY -= 1;
            } else if (nextDirection === 'right') {
                newX += 1;
            } else if (nextDirection === 'down') {
                newY += 1;
            }

            // Boundary and wall collision detection
            if (newX >= 0 && newX < tileCount && newY >= 0 && newY < tileCount && maze[newY] && maze[newY][newX] !== 1) {
                setPacmanX(newX);
                setPacmanY(newY);

                if (maze[newY][newX] === 2) {
                    // Eat pellet
                    const newMaze = maze.map((row, y) =>
                        row.map((cell, x) => (x === newX && y === newY ? 0 : cell))
                    );
                    setMaze(newMaze);
                    setScore(prevScore => prevScore + 10);
                }
            }

            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);

            drawMaze();
            drawPacman();
            drawGhosts();

            if (score > highScore) {
                setHighScore(score);
            }
        };

        const keyDownHandler = (event) => {
            switch (event.keyCode) {
                case 37: // Left
                    setNextDirection('left');
                    break;
                case 38: // Up
                    setNextDirection('up');
                    break;
                case 39: // Right
                    setNextDirection('right');
                    break;
                case 40: // Down
                    setNextDirection('down');
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        const intervalRef = setInterval(gameLoop, 100); // Store interval in ref

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            clearInterval(intervalRef); // Clear interval using ref
        };
    }, [score, highScore, ghosts, pacmanX, pacmanY, nextDirection, maze, lives, gameOver, tileCount, gridSize]);

    const resetGame = () => {
        setGameOver(false);
        setScore(0);
        setLives(3);
        setPacmanX(initialPacmanX);
        setPacmanY(initialPacmanY);
        setNextDirection(null);
        setMaze(initialMaze);
        setGhosts([
            { x: 13, y: 11, xVelocity: 1, yVelocity: 0, color: 'red' },
            { x: 14, y: 11, xVelocity: -1, yVelocity: 0, color: 'pink' },
            { x: 13, y: 12, xVelocity: 0, yVelocity: 1, color: 'cyan' },
            { x: 14, y: 12, xVelocity: 0, yVelocity: -1, color: 'orange' }
        ]);
    };

    return (
        <>
            <div id="scoreboard">
                <div>High Score: {highScore}</div>
                <div>Score: {score}</div>
                <div>Lives: {lives}</div>
            </div>
            <canvas id="pacman" width="560" height="560" ref={canvasRef}></canvas> {/* Use the ref */}
            {gameOver && (
                <button onClick={resetGame}>Try Again</button>
            )}
        </>
    );
};

export default Packman;