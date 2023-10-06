import { MongoClient } from "mongodb";
import express from 'express'

const {pathname : root} = new URL('../app', import.meta.url)

const app = express();
const port = 3000;

const MONGO_DATABASE = process.env.MONGO_DATABASE
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_HOST = process.env.MONGO_HOST ?? 'localhost'
const MONGO_PORT = process.env.MONGO_PORT ?? '27017'
const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`
console.log(uri)

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 2000,
  authSource: MONGO_DATABASE
})

const getDBData = async (req, res) => {
  try {
    await client.connect()
    const database = client.db(MONGO_DATABASE)
    const movies_tbl = database.collection('movies')
    const movies =  await movies_tbl.find().toArray()
    const created = new Date()
    res.status(200).json({ movies, student:MONGO_USERNAME, created});
  } catch {
    res.sendStatus(404)
  } finally {
    await client.close()
  }
};

app.use(express.static(`${root}/public`));
app.get("/api", getDBData);


(async () => {
  try {
    await client.connect();
    console.log("Connected to db");
  } catch (e) {
    console.log("connection to db error", e);
  }

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
})();
