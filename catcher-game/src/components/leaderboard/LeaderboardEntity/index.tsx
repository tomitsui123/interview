import { ListGroup, Badge } from 'react-bootstrap'
import './index.css'

export interface ILeaderboardEntity {
  name: string
  count: number
  rank?: number,
  isHighlight: boolean
}

const LeaderboardEntity = ({
  rank,
  name,
  count,
  isHighlight = false
}: ILeaderboardEntity) => (
  <ListGroup.Item
    variant={isHighlight ? 'primary' : 'light'}
    as='li'
    className='d-flex justify-content-between align-items-start'
  >
    <div className='ms-2 me-auto'>
      {rank}
    </div>
    <div className='ms-2 me-auto'>
      <div className='fw-bold'>{name}</div>
    </div>
    <Badge bg='primary' pill>
      {count}
    </Badge>
  </ListGroup.Item>
)

export default LeaderboardEntity
