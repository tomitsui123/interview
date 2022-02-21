import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Card,
  Col,
  Container,
  ListGroup,
  Pagination,
  Row,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useInterval } from '../../../hooks/useInterval'
import LeaderboardEntity, {
  ILeaderboardEntity,
} from '../LeaderboardEntity'

const TOTAL_DATA_AMOUNT = 100
const SHOW_ROW = 20

const Canvas = () => {
  const { token } = useParams()
  const [currentData, setCurrentData] =
    useState<ILeaderboardEntity>()
  const [leaderboardData, setLeaderboardData] = useState<
    ILeaderboardEntity[]
  >([])
  const [pagination, setPagination] = useState(1)
  const getLeaderboardData = async () => {
    const res = await axios.get('/api')
    const { result } = res.data
    setLeaderboardData(result)
  }
  const getDataById = async (token: string) => {
    const res = await axios.get(`/api/${token}`)
    setCurrentData(res.data)
  }
  useInterval(async () => {
    const res = await axios.get('/api')
    const { result } = res.data
    setLeaderboardData(result)
  }, 1500)
  useEffect(() => {
    getLeaderboardData()
  }, [])

  useEffect(() => {
    if (token) {
      getDataById(token)
    }
  }, [token])

  const paginationItems = []
  for (
    var i = 1;
    i <= leaderboardData.length / SHOW_ROW;
    i++
  ) {
    paginationItems.push(
      <Pagination.Item
        onClick={(event) => {
          setPagination(
            parseInt(
              (event.target as HTMLInputElement)
                .textContent as string
            )
          )
        }}
        key={i}
        active={i === pagination}
      >
        {i}
      </Pagination.Item>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Top 100 player</h1>
      <br />
      <Pagination
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {paginationItems}
      </Pagination>
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <ListGroup as='ol' variant='flush'>
          {leaderboardData
            .slice(
              SHOW_ROW * (pagination - 1),
              SHOW_ROW * pagination
            )
            .map((e, idx) => (
              <>
                <LeaderboardEntity
                  isHighlight={e.name === currentData?.name}
                  rank={
                    SHOW_ROW * (pagination - 1) + idx + 1
                  }
                  name={e.name}
                  count={e.count}
                />
              </>
            ))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default Canvas
