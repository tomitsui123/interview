import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Card,
  ListGroup,
  Pagination,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useInterval } from '../../../hooks/useInterval'
import LeaderboardEntity, {
  ILeaderboardEntity,
} from '../LeaderboardEntity'
import './index.css'

const TOTAL_DATA_AMOUNT = 100
const SHOW_ROW = 20

const Canvas = () => {
  const { token } = useParams()
  const [currentData, setCurrentData] = useState<ILeaderboardEntity>()
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
  for (var i = 1; i <= TOTAL_DATA_AMOUNT / SHOW_ROW; i++) {
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
    <div className='canvas'>
      <h1>Top 100 player</h1>
      <br />
      {currentData && <h5>
        Hi {currentData?.name}, your rank is {2}
      </h5>}
      <Card style={{ width: '18rem' }}>
        <ListGroup as='ol' variant='flush'>
          {leaderboardData
            .slice(
              SHOW_ROW * (pagination - 1),
              SHOW_ROW * pagination
            )
            .map((e, idx) => (
              <>
                <LeaderboardEntity
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
      <Pagination>{paginationItems}</Pagination>
    </div>
  )
}

export default Canvas
