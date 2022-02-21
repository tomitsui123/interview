import { MongoClient } from 'mongodb'

const host = process.env.DATABASE_HOST || 'localhost'
const port = process.env.DATABASE_PORT || 27017
const database = process.env.DATABASE || 'catcher'
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || 'sandboxVR'
const connectionUri = `mongodb://${username}:${password}@${host}:${port}`

const getTop100List = async () => {
  let client = new MongoClient(connectionUri)
  try {
    client = await client.connect()
    const db = client.db('catcher')
    const collection = db.collection('leaderboard')
    const findCursor = await collection
      .find({ name: { $ne: '' } })
      .sort({ count: -1 })
      .limit(100)
    let res = await findCursor.toArray()
    let top100List = res.map((e) => ({
      name: e.name,
      count: e.count,
    }))
    return top100List
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
}

const createNewSession = async (token: string) => {
  let client = new MongoClient(connectionUri)
  try {
    client = await client.connect()
    const db = client.db('catcher')
    const collection = db.collection('leaderboard')
    await collection.insertOne({
      token,
      name: '',
      count: 0,
    })
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
}

const editSession = async ({ token, name, count }) => {
  let client = new MongoClient(connectionUri)
  try {
    client = await client.connect()
    const db = client.db('catcher')
    const collection = db.collection('leaderboard')
    const condition = {
      token,
      name: { $eq: '' },
    }
    const data = await collection.findOne(condition)
    if (!data) throw new Error('not found')
    let updatedField = {}
    if (name) {
      updatedField = { name }
    } else if (count) {
      updatedField = { count }
    }

    await collection.updateOne(condition, {
      $set: updatedField,
    })
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  } finally {
    client.close()
  }
}

const getDataById = async (id: string) => {
  let client = new MongoClient(connectionUri)
  try {
    client = await client.connect()
    const db = client.db('catcher')
    const collection = db.collection('leaderboard')
    const data = await collection.findOne({
      token: id,
    })
    return data
  } catch (e) {
    console.log(e)
    throw e
  } finally {
    client.close()
  }
}

const createRandomRecord = async (randomRecordList) => {
  let client = new MongoClient(connectionUri)
  try {
    client = await client.connect()
    const db = client.db('catcher')
    const collection = db.collection('leaderboard')
    await collection.insertMany(randomRecordList)
  } catch (e) {
    console.log(e)
    throw e
  } finally {
    client.close()
  }
}

export {
  getTop100List,
  createNewSession,
  editSession,
  getDataById,
  createRandomRecord,
}
