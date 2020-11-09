import React, { useState } from "react";
import "./App.css";
import Container from "./containers/Container";
import { randomSquare09, markedSquare } from "./utils";
import { GAME_STATUS } from "./constant";

export const AppContext = React.createContext({});

function App() {
  const squareSize = 20;
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_START);
  const [squareData, setSquareData] = useState();

  const startGame = () => {
    // generate new mine data
    setSquareData(markedSquare(randomSquare09(squareSize)));
    setGameStatus(GAME_STATUS.STARTED);
  };

  const endGame = () => {
    setGameStatus(GAME_STATUS.OVER);
  };

  return (
    <AppContext.Provider
      value={{
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
