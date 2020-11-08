import React, { useState } from "react";
import "./App.css";
import Container from "./containers/Container";
import { randomSquare09, markedSquare, log } from "./utils";

export const AppContext = React.createContext({});

function App() {
  const squareSize = 20;
  const [gameStatus, setGameStatus] = useState(0);
  const [squareData, setSquareData] = useState();

  const startGame = () => {
    // generate new mine data
    setSquareData(markedSquare(randomSquare09(squareSize)));
    setGameStatus(1);
  };

  const endGame = () => {
    setGameStatus(2);
  };

  return (
    <AppContext.Provider
      value={{
        // 0 not start
        // 1 gaming
        // 2 over
        gameStatus,
        squareData,
        squareSize,
      }}
    >
      <Container className="App" startGame={startGame} endGame={endGame} />
    </AppContext.Provider>
  );
}

export default App;
