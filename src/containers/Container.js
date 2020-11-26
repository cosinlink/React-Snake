import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../App'
import { Grid } from '../components/Grid'
import { useSnakeMove } from '../hooks/snake'
import { isOppositeDirection, getSquareDisplayed, gameOver } from './helper'

const StartButton = styled.button`
    margin-top: 40px;
    margin-bottom: 30px;

    background: palevioletred;
    color: white;
    font-size: 1.5em;
    padding: 0.3em 1.2em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

const PauseButton = styled.button`
    position: absolute;
    right: 150px;
    top: 50px;

    background: palevioletred;
    color: white;
    font-size: 1.2em;
    padding: 0.3em 0.3em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

const StyledGridLine = styled.div`
    height: 30px;
    margin-top: 0.1em;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledContainer = styled.div`
    text-align: center;
    margin: 0 auto;
    color: #61dafb;
`

const Container = ({ appStart, appPause, endGame }) => {
    const { gameStatus, squareSize } = useContext(AppContext)
    const [direction, setDirection] = useState(3)
    const [snakeQueue, sweetGrid] = useSnakeMove(
        direction,
        gameStatus,
        squareSize
    )

    // display all grids
    const renderGrids = () => {
        if (gameOver(snakeQueue, squareSize)) {
            endGame()
        }

        const displayed = getSquareDisplayed(snakeQueue, squareSize)
        displayed[sweetGrid[0]][sweetGrid[1]] = true
        const grids = []
        for (let x = 0; x < squareSize; x++) {
            const gridLine = []
            for (let y = 0; y < squareSize; y++) {
                gridLine.push(
                    <Grid displayed={displayed[x][y]} gameStatus={gameStatus} />
                )
            }
            grids.push(<StyledGridLine>{gridLine}</StyledGridLine>)
        }
        return grids
    }

    // when direction key pressed, set new Direction except opposite direction
    const onKeyPressed = (event) => {
        const keyMapper = {
            ArrowUp: 1,
            ArrowRight: 2,
            ArrowDown: 3,
            ArrowLeft: 4,
        }
        const newDirection = keyMapper[event.key]

        // invalid keys
        if (newDirection === undefined) {
            return
        }

        setDirection((prevDirection) => {
            if (isOppositeDirection(newDirection, prevDirection)) {
                return prevDirection
            }
            return newDirection
        })
    }

    return (
        <StyledContainer
            className="Container"
            onKeyDown={onKeyPressed}
            tabIndex="0"
        >
            <StartButton onClick={appStart}>Start SnakeGame</StartButton>
            <PauseButton onClick={appPause}>Pause</PauseButton>

            {renderGrids()}
        </StyledContainer>
    )
}

export default Container
