import React, {useState, useContext, useEffect} from 'react'
import {AppContext} from '../App'
import {Grid} from '../components/Grid'
import {clonedSquare} from '../utils'
import styled from 'styled-components'
import {GAME_STATUS} from '../constant'
import _ from 'lodash'

const log = console.log.bind(console)

const isOppositeDirection = (direction1, direction2) => {
    return Math.abs(direction1 - direction2) === 2
}

const emptySquare = (squareSize) => {
    const square = []
    for (let i = 0; i < squareSize; i++) {
        square.push([])
    }
    return square
}

const getSquareDisplayed = (snakeQueue, squareSize) => {
    let displayed = emptySquare(squareSize)
    for (const [x, y] of snakeQueue) {
        if (outOfBounds(x, y, squareSize)) {
            continue
        }
        displayed[x][y] = true
    }
    return displayed
}

const generateNewHead = (prevQueue, direction) => {
    const snakeHead = [...prevQueue[0]]

    // snakeHead moved from prev snakeHead to direction once
    if (direction === 1) {
        snakeHead[0]--
    } else if (direction === 2) {
        snakeHead[1]++
    }  else if (direction === 3) {
        snakeHead[0]++
    }  else if (direction === 4) {
        snakeHead[1]--
    }

    return snakeHead
}

const getMovedQueue = (prevQueue, direction) => {
    const newQueue = clonedSquare(prevQueue)
    const snakeHead = generateNewHead(newQueue, direction)

    // add new snakeHead to first index of newQueue
    newQueue.unshift(snakeHead)

    // remove snakeTail
    newQueue.pop()

    return newQueue
}

const eatSweet = (queue, direction) => {
    queue.unshift(generateNewHead(queue, direction))
    return queue
}

const useSnakeMove = (direction, gameStatus, squareSize) => {
    const initQueue = [[5, 8], [5, 7], [5, 6]]
    const [snakeQueue, setSnakeQueue] = useState(initQueue)
    const [sweetGrid, setSweetGrid] = useState(generateRandomSweet(initQueue, squareSize))

    useEffect(
        () => {
            const id = setInterval(() => {
                if (gameStatus !== GAME_STATUS.STARTED) {
                    return
                }
                setSnakeQueue((prevQueue) => {
                    let newQueue = getMovedQueue(prevQueue, direction)

                    // snake eat the sweet
                    if (targetInQueue(sweetGrid, snakeQueue)) {
                        newQueue = eatSweet(newQueue, direction)
                        setSweetGrid(generateRandomSweet(newQueue, squareSize))
                    }

                    return newQueue
                })
            }, 400)
            return () => {
                clearInterval(id)
            }
        }
    )
    return [snakeQueue, sweetGrid]
}

const targetInQueue = (target, queue) => {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i][0] === target[0] && queue[i][1] === target[1]) {
            return true
        }
    }
    return false
}

const outOfBounds = (x, y, squareSize) => {
    return (x < 0 || x >= squareSize || y < 0 || y >= squareSize)
}

const gameOver = (queue, squareSize) => {
    const hasVisited = {}
    for (const [x, y] of queue) {
        if (outOfBounds(x, y, squareSize) || hasVisited[`${x},${y}`]) {
            return true
        }
        hasVisited[`${x},${y}`] = true
    }

    return false
}

const generateRandomSweet = (snakeQueue, squareSize) => {
    log(`generateRandomSweet`, snakeQueue)
    log(`squareSize`, squareSize)

    let x = _.random(0, squareSize - 1)
    let y = _.random(0, squareSize - 1)
    while (targetInQueue([x, y], snakeQueue)) {
        x = _.random(0, squareSize - 1)
        y = _.random(0, squareSize - 1)
    }

    log(`x,y=`, x, y)
    return [x, y]
}

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

const StyledButtonLine = styled.div`
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

const Container = ({appStart, appPause, endGame}) => {
    const {gameStatus, squareSize} = useContext(AppContext)
    const [direction, setDirection] = useState(3)
    const [snakeQueue, sweetGrid] = useSnakeMove(direction, gameStatus, squareSize)

    const containerStart = () => {
        appStart()
    }

    const containerPause = () => {
        appPause()
    }

    const renderGrids = () => {
        if (gameOver(snakeQueue, squareSize)) {
            log(`gameOver`)
            endGame()
        }

        const displayed = getSquareDisplayed(snakeQueue, squareSize)
        displayed[sweetGrid[0]][sweetGrid[1]] = true
        const grids = []
        for (let x = 0; x < squareSize; x++) {
            const gridLine = []
            for (let y = 0; y < squareSize; y++) {
                gridLine.push(
                    <Grid
                        displayed={displayed[x][y]}
                        gameStatus={gameStatus}
                    />
                )
            }
            grids.push(<StyledButtonLine>{gridLine}</StyledButtonLine>)
        }
        return grids
    }

    // when direction key pressed, set new Direction except opposite direction
    const onKeyPressed = (event) => {
        const keyMapper = {
            "ArrowUp": 1,
            "ArrowRight": 2,
            "ArrowDown": 3,
            "ArrowLeft": 4,
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
            <StartButton onClick={containerStart}>
                Start SnakeGame
            </StartButton>
            <PauseButton onClick={containerPause}>
                Pause
            </PauseButton>

            {renderGrids()}
        </StyledContainer>
    )
}

export default Container
