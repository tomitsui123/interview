import KSUID from 'ksuid'
import randomName from 'node-random-name'
import * as service from './services'

export interface LeaderBoardData {
  count: number
  name: string
  id?: string
}

const createNewSession = async () => {
  const now = new Date()
  const token = await KSUID.random(now.getTime())
  await service.createNewSession(token.string)
  return token
}

const getTop100List = async () => {
  const top100List = await service.getTop100List()
  return top100List
}

const getDataById = async (id: string) => {
  const data = await service.getDataById(id)
  return {
    count: data.count,
    name: data.name,
  }
}

const editSession = async ({
  id,
  name,
  count,
}: {
  id: string
  name: string
  count: number
}) => {
  await service.editSession({ token: id, name, count })
}

const createRandomRecord = async () => {
  const randomRecordList = []
  const randomList = [-250, -100,-50,0,100,50,250,300,450,600,400]
  for (var i = 0; i < 100; i++) {
    const now = new Date()
    const token = await KSUID.random(now.getTime())
    randomRecordList.push({
      token: token.string,
      count: randomList[Math.floor(Math.random() * randomList.length)],
      name: randomName({ random: Math.random }),
    })
  }
  await service.createRandomRecord(randomRecordList)
}

export {
  createNewSession,
  getTop100List,
  getDataById,
  editSession,
  createRandomRecord,
}
