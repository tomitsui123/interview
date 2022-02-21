import { useEffect, useState } from 'react'
import InfoBar from '../InfoBar'
import { useInterval } from '../../../hooks/useInterval'
import GameCanvas from './GameCanvas'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  GAME_TIME,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from '../../../constants'
import StyledButton from '../../styles/StyledButton'

const GamePage = () => {
  const [gameOver, setGameOver] = useState(false)
  const [point, setPoint] = useState(0)
  const [token, setToken] = useState('')
  const [remainingTime, setRemainingTime] =
    useState(GAME_TIME)

const navigate = useNavigate()
  console.log('re-render')
  useEffect(() => {
    getToken()
  }, [])
  useInterval(() => {
    if (remainingTime > 0) {
      setRemainingTime((prev) => prev - 1)
    } else {
      setGameOver(true)
    }
  }, 1000)
  const startGame = async () => {
    setGameOver(false)
    setRemainingTime(GAME_TIME)
  }

  const getToken = async () => {
    const res = await axios.post('/api')
    const { token } = res.data
    setToken(token)
  }

  const submitScore = async () => {
    const res = await axios.put(`/api/${token}`, null, {
      params: { count: point },
    })
    const { message } = res.data
    if (message === 'OK') {
      navigate(`/leaderboard/new/${token}`)
    }
  }

  return (
    <Container
      style={{
        width: STAGE_WIDTH,
        height: '100vh',
        border: '5px solid black',
      }}
    >
      {gameOver ? (
        <Container
          style={{
            position: 'absolute',
            top: STAGE_HEIGHT / 2,
          }}
        >
          <Row>
            <Col>
              <div>
                <h3
                  style={{
                    fontFamily: 'CursedTimer',
                    color: 'white',
                  }}
                >
                  Your Score:{' '}
                </h3>
                <h3
                  style={{
                    fontFamily: 'CursedTimer',
                    color: 'white',
                  }}
                >
                  {point}
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledButton
                onClick={() => submitScore()}
                style={{ fontSize: 14 }}
              >
                Send to leaderboard
              </StyledButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledButton
                onClick={() => startGame()}
                style={{ fontSize: 14 }}
              >
                Retry
              </StyledButton>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <InfoBar
            score={point}
            remainingSecond={remainingTime}
          />
          <Row>
            <Col>
              <GameCanvas
                setPoint={setPoint}
                gameOver={gameOver}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default GamePage
