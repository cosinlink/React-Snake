import React, { useState } from 'react'
import './App.css'
import Container from './containers/Container'
import { GAME_STATUS, SQUARE_SIZE } from './constant'
import styled from 'styled-components'

export const AppContext = React.createContext({})

const ModalContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`

const ModalMask = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
`

const AlertWindow = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 200px;
    line-height: 200px;
    font-size: xx-large;
    opacity: 1;

    top: 50%;
    position: relative;
    transform: translateY(-50%);
    background: white;
    text-align: center;
    color: palevioletred;
`

function App() {
    const squareSize = SQUARE_SIZE
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_START)

    const appStart = () => {
        setGameStatus(GAME_STATUS.STARTED)
    }

    const appPause = () => {
        setGameStatus((prev) => {
            if (prev === GAME_STATUS.PAUSE) {
                return GAME_STATUS.STARTED
            } else {
                return GAME_STATUS.PAUSE
            }
        })
    }

    const endGame = () => {
        setGameStatus(GAME_STATUS.OVER)
    }

    const renderAlert = () => {
        if (gameStatus !== GAME_STATUS.OVER) {
            return null
        }

        return (
            <ModalContainer>
                <ModalMask/>
                <AlertWindow>GAME OVER~_~</AlertWindow>
            </ModalContainer>
        )
    }

    return (
        <AppContext.Provider
            value={{
                gameStatus,
                squareSize,
            }}
        >
            {renderAlert()}
            <Container
                appStart={appStart}
                appPause={appPause}
                endGame={endGame}
            />
        </AppContext.Provider>
    )
}

export default App
