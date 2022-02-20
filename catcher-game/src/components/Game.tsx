import { Col, Container, Row } from 'react-bootstrap'

const Game = () => (
  <Container>
    <Row>
      <Col md={3} lg={{ span: 3, offset: 1 }} />
      <Col sm={8} md={12} lg={6}>
        <div style={{ backgroundColor: 'red', height: '80vh' }}>
          <div>hihihi</div>
        </div>
      </Col>
      <Col
        sm={12}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 3, offset: 0 }}
      />
    </Row>
  </Container>
)
export default Game
