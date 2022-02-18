import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ILeaderboardEntity } from '../LeaderboardEntity'

const CreateNewRecordCanvas = () => {
  let navigate = useNavigate()
  const [data, setData] = useState<ILeaderboardEntity>()
  let { token } = useParams()
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await axios.get(`/api/${token}`)
    setData(res.data)
  }
  const handleSubmit = () => {
    console.log('fuck')
    navigate('/leaderboard')
  }
  return (
    <div>
      <h3>Your Score</h3>
      <h1>5</h1>
      <div>
        <input />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default CreateNewRecordCanvas
