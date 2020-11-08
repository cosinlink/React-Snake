import React from "react";
import "./MineButton.css";
import { MINE_NUMBERS, GAME_STATUS } from "../constant";

export const MineButton = ({
  coordinate,
  number,
  handleClick,
  gameStatus,
  displayed,
}) => {
  const clickButton = () => {
    handleClick(coordinate.x, coordinate.y);
  };

  const getDisplayStr = () => {
    if (number === MINE_NUMBERS.MINE) {
      return "X";
    }
    if (number === MINE_NUMBERS.EMPTY) {
      return "";
    }
    return number + "";
  };

  const display = () => {
    if (gameStatus === GAME_STATUS.NOT_START) {
      return "";
    }

    // clicked mine, game over
    if (gameStatus === GAME_STATUS.OVER && number === MINE_NUMBERS.MINE) {
      return "X";
    }

    return displayed ? getDisplayStr() : "";
  };

  return (
    <button
      type="button"
      className={`Mine${displayed ? " Displayed" : ""}`}
      onClick={clickButton}
      disabled={gameStatus !== GAME_STATUS.STARTED}
    >
      {display()}
    </button>
  );
};
