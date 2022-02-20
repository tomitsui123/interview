import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => (
  <Navbar bg='primary' variant='dark' expand='lg'>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        Tommy's Catcher Game
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='/'>
            Game
          </Nav.Link>
          <Nav.Link
            href='/leaderboard'
          >
            Leaderboard
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
