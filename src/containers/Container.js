import React, {useState, useContext, useEffect} from 'react'
import {AppContext} from '../App'
import {Pane} from '../components/Pane'
import {clonedSquare, markedSquare, randomSquare09} from '../utils'
import {MINE_NUMBERS, GAME_STATUS} from '../constant'
import './Container.css'

const log = console.log.bind(console)

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
        displayed[x][y] = true
    }
    return displayed
}

const getMovedQueue = (prevQueue, direction) => {
    const snakeHead = [...prevQueue[0]]
    const newQueue = clonedSquare(prevQueue)

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

    // add new snakeHead to first index of newQueue
    newQueue.unshift(snakeHead)

    // remove snakeTail
    newQueue.pop()

    return newQueue
}

const useSnakeMove = (direction) => {
    const [snakeQueue, setSnakeQueue] = useState(
        [[5, 6], [5, 7], [5, 8]]
    )

    useEffect(
        () => {
            const id = setInterval(() => {
                setSnakeQueue((prevQueue) => getMovedQueue(prevQueue, direction))
            }, 1000)
            return () => {
                clearInterval(id)
            }
        }
    )

    return snakeQueue
}

const Container = (props) => {
    const {appStart} = props
    const {gameStatus, squareSize} = useContext(AppContext)
    const [direction, setDirection] = useState(3)
    const snakeQueue = useSnakeMove(direction)

    const generatePanes = () => {
        const displayed = getSquareDisplayed(snakeQueue, squareSize)
        const buttons = []
        for (let x = 0; x < squareSize; x++) {
            const buttonLine = []
            for (let y = 0; y < squareSize; y++) {
                buttonLine.push(
                    <Pane
                        displayed={displayed[x][y]}
                        coordinate={{x, y}}
                        gameStatus={gameStatus}
                    />
                )
            }
            buttons.push(<div className="Row">{buttonLine}</div>)
        }
        return buttons
    }

    const onKeyPressed = (event) => {
        const keyMapper = {
            "ArrowUp": 1,
            "ArrowRight": 2,
            "ArrowDown": 3,
            "ArrowLeft": 4,
        }
        const newDirection = keyMapper[event.key]
        log('newDirection1', newDirection)

        if (newDirection === undefined) {
            return
        }

        log('newDirection2', newDirection)
        setDirection(newDirection)
    }

    return (
        <div
            className="Container"
            onKeyDown={onKeyPressed}
            tabIndex="0"
        >
            <button className="Start">
                Start Snake Game
            </button>
            {generatePanes()}
        </div>
    )
}

export default Container
