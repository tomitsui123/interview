import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const StyledInfoBar = styled.div`
  color: white;
  font-family: 'CursedTimer';
  font-size: 30px;
`

const InfoBar = ({
  score,
  remainingSecond,
}: {
  score: number
  remainingSecond: number
}) => {
  return (
    <StyledInfoBar>
      <Container>
        <Row>
          <Col>Score</Col>
          <Col>Time</Col>
        </Row>
        <Row>
          <Col>{score}</Col>
          <Col>{remainingSecond}</Col>
        </Row>
      </Container>
    </StyledInfoBar>
  )
}
export default InfoBar
