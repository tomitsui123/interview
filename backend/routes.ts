import { Router, Request, Response } from 'express'
import {
  createNewSession,
  createRandomRecord,
  editSession,
  getDataById,
  getTop100List,
  LeaderBoardData,
} from './controllers'
import ErrorResponse from './data/ErrorResponse'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const top100List = await getTop100List()
    return res.json({
      result: top100List,
    })
  } catch (e) {
    console.log(e)
    const err = new ErrorResponse(e.message)
    return res.status(400).json(err)
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const token = await createNewSession()
    return res.json({ token })
  } catch (e) {
    console.log(e.message)
    const err = new ErrorResponse(e.message)
    return res.status(400).json(err)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const leaderBoardData: LeaderBoardData = await getDataById(id)
    if (!leaderBoardData) {
      throw new Error('not found')
    }
    console.log(leaderBoardData)
    return res.json(leaderBoardData)
  } catch (e) {
    console.log(e)
    const err = new ErrorResponse(e.message)
    return res.status(400).json(err)
  }
})

router.post('/random', async (_req: Request, res: Response) => {
  try {
    await createRandomRecord()
    return res.json({message: 'Created 100 new random record'})
  } catch(e) {
    console.log(e)
    const err = new ErrorResponse(e.message)
    return res.status(400).json(err)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, count } = req.query
  console.log(id, name, count)
  try {
    await editSession({ id, name: (name as string), count: parseInt(count as string) })
    return res.json({ message: 'OK' })
  } catch (e) {
    console.log(e)
    const err = new ErrorResponse(e.message)
    return res.status(400).json(err)
  }
})

export default router
