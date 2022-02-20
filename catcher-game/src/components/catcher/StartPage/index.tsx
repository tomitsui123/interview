import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import bgImage from '../../../img/bg1.png'
import StartButton from '../StartButton.tsx'

import './index.css'

const StartPage = ({
  startGame,
}: {
  startGame: () => void
}) => {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        height: '80vh',
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col md={3} lg={{ span: 3 }} />
        <Col sm={8} md={12} lg={6}>
          <div
            style={{ height: '100%' }}
            className='d-flex justify-content-center align-items-center'
          >
            <StartButton onClick={startGame} />
          </div>
        </Col>
        <Col md={3} lg={{ span: 3 }} />
      </Row>
    </Container>
  )
}
export default StartPage
