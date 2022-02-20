import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GamePage from '../GamePage'
import StartPage from '../StartPage'
import startBgImg from '../../../img/bg1.png'
import gameBgImg from '../../../img/bg2.png'

import './index.css'

const GameWrapper = () => {
  const [gameStarted, setGameStarted] = useState(false)
  useEffect(() => {
    setGameStarted(false)
  }, [])
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${
          gameStarted ? gameBgImg : startBgImg
        })`,
        backgroundPosition: 'center',
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col md={3} lg={{ span: 3 }} />
        <Col
          sm={8}
          md={12}
          lg={6}
          className='d-flex justify-content-center '
        >
          {gameStarted ? (
            <GamePage />
          ) : (
            <StartPage
              startGame={() => setGameStarted(true)}
            />
          )}
        </Col>
        <Col md={3} lg={{ span: 3 }} />
      </Row>
    </Container>
  )
}
export default GameWrapper
