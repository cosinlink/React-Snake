import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { MineButton } from "../components/MineButton";
import {clonedSquare, markedSquare, randomSquare09} from "../utils";
import { MINE_NUMBERS, GAME_STATUS } from "../constant";
import "./Container.css";

const emptySquare = (squareSize) => {
  const square = [];
  for (let i = 0; i < squareSize; i++) {
    square.push([]);
  }
  return square;
};

const Container = (props) => {
  const { appStart, generateSquareData, endGame } = props;
  const { gameStatus, squareData, squareSize } = useContext(AppContext);
  const [squareDisplayed, setSquareDisplayed] = useState(
    emptySquare(squareSize)
  );
  const [dataGenerated, setDataGenerated] = useState(false)

  const valid = (target) => {
    const rows = squareData.length;
    if (rows === 0) {
      return false;
    }
    const cols = squareData[0].length;
    return target.x >= 0 && target.y >= 0 && target.x < rows && target.y < cols;
  };

  // when click mineButton, rerender buttons displayed
  const renderButtonsDisplayed = (prev, squareData, x, y) => {
    const displayed = clonedSquare(prev);
    if (squareData[x][y] !== 0) {
      displayed[x][y] = true;
      return displayed;
    }

    // when squareData[x][y] === 0
    const queue = [{ x, y }];
    const directions = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    let current;
    while (queue.length > 0) {
      current = queue.shift();
      if (displayed[current.x][current.y]) {
        continue;
      }
      displayed[current.x][current.y] = true;
      if (squareData[current.x][current.y] !== 0) {
        continue;
      }

      // empty button
      for (let i = 0; i < directions.length; i++) {
        const target = {
          x: current.x + directions[i][0],
          y: current.y + directions[i][1],
        };
        if (valid(target)) {
          queue.push(target);
        }
      }
    }

    console.log(`renderButtons displayed: ${displayed}`)
    return displayed;
  };

  // make sure the mineButton is 0 when user first clicked
  const generateDataForFirstClick = (x, y) => {
    let data = markedSquare(randomSquare09(squareSize))
    while (data[x][y] !== 0) {
      data = markedSquare(randomSquare09(squareSize))
    }
    generateSquareData(data)
    return data
  }

  const handleClick = (x, y) => {
    console.log(x, y)
    console.log(`dataGenerated: ${dataGenerated}`)

    let data
    // first click
    if (!dataGenerated) {
      data = generateDataForFirstClick(x, y)
      setDataGenerated(true)
    } else { // not first click
      data = squareData
    }

    console.log(`squareData: ${data}`)
    // click mine
    if (data[x][y] === MINE_NUMBERS.MINE) {
      return endGame();
    }

    // click empty button whose number = 0
    setSquareDisplayed((prev) => renderButtonsDisplayed(prev, data, x, y));
  };

  const generateButtons = function () {
    const buttons = [];
    for (let x = 0; x < squareSize; x++) {
      const buttonLine = [];
      for (let y = 0; y < squareSize; y++) {
        buttonLine.push(
          <MineButton
            coordinate={{ x, y }}
            number={squareData ? squareData[x][y] : -1}
            handleClick={handleClick}
            gameStatus={gameStatus}
            disbaled={gameStatus !== GAME_STATUS.STARTED}
            displayed={squareDisplayed ? squareDisplayed[x][y] : false}
          />
        );
      }
      buttons.push(<div className="Row">{buttonLine}</div>);
    }
    return buttons;
  };

  const containerStart = () => {
    setDataGenerated(false)
    setSquareDisplayed(emptySquare(squareSize));
    appStart();
  }

  return (
    <div className="Container">

      <button
        className="Start"
        onClick={containerStart}
      >
        Start MineSweeper
      </button>
      {generateButtons()}
    </div>
  );
};

export default Container;
