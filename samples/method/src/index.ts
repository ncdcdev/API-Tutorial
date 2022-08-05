import express from 'express'
import AppDataSource from '../data-source'
import { Content } from './entities/Content'

const app: express.Express = express()

// CORSの許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

AppDataSource.initialize()

const router: express.Router = express.Router()

const repository = AppDataSource.getRepository(Content)

// GET /contents
router.get('/contents', async (req: express.Request, res: express.Response) => {
  const contents = await repository.find()
  res.send(contents)
})

// GET /contents/:id
router.get('/contents/:id', async (req: express.Request, res: express.Response) => {
  const content = await repository.findOne({
    where: { id: Number(req.params.id) },
    order: { id: 'ASC' },
  })
  if (content == null) res.status(404).send()
  res.send(content)
})

app.use(router)
// 3000番ポートでAPIサーバ起動
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
