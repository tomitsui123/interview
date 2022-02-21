import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ILeaderboardEntity } from '../LeaderboardEntity'
import gameBgImg from '../../../img/bg2.png'
import styled from 'styled-components'
import StyledButton from '../../styles/StyledButton'

const StyledCanvas = styled.div`
  padding-top: 100px;
  background-image: url(${gameBgImg});
  height: 100vh;
  font-family: 'CursedTimer';
  color: white;
`

const CreateNewRecordCanvas = () => {
  let navigate = useNavigate()
  const [data, setData] = useState<ILeaderboardEntity>()
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')
  let { token } = useParams()
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await axios.get(`/api/${token}`)
    setData(res.data)
  }
  const handleSubmit = async () => {
    try {
      const res = await axios.put(`/api/${token}`, null, {
        params: { name },
      })
      console.log('hi')
      if (res.data.message === 'OK') {
        navigate(`/leaderboard/${token}`)
      }
    } catch (error) {
      setError('not found')
    }
  }
  return (
    <StyledCanvas>
      <Container>
        <Row>
          <Col md={4} sm={12} />
          <Col md={4} style={{ textAlign: 'center' }}>
            <h3>Your Score</h3>
            <h1>{data?.count}</h1>
            {error && (
              <Alert style={{fontFamily: 'Arial'}} variant='danger'>
                <Alert.Heading>
                  Not Found
                </Alert.Heading>
              </Alert>
            )}
            <div>
              <input
                placeholder='Your name'
                onChange={(e) =>
                  setName(e.currentTarget.value)
                }
              />
            </div>
            <StyledButton onClick={handleSubmit}>
              Submit
            </StyledButton>
          </Col>
          <Col md={4} sm={12} />
        </Row>
      </Container>
    </StyledCanvas>
  )
}

export default CreateNewRecordCanvas
