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
  try {
    const contents = await repository.find()
    res.send(contents)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// POST /contents
router.post('/contents', async (req: express.Request, res: express.Response) => {
  try {
    const content = new Content(req.body.title, req.body.body)
    await repository.save(content)
    res.send(content)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// GET /contents/:id
router.get('/contents/:id', async (req: express.Request, res: express.Response) => {
  try {
    const content = await repository.findOne({
      where: { id: Number(req.params.id) },
      order: { id: 'ASC' },
    })
    if (content == null) {
      res.status(404).send()
      return
    }
    res.send(content)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// PUT /contents/:id
router.put('/contents/:id', async (req: express.Request, res: express.Response) => {
  try {
    const content = await repository.findOne({
      where: { id: Number(req.params.id) },
    })
    if (content == null) {
      res.status(404).send()
      return
    }

    // PATCH的に一部更新も可能とする
    content.title = req.body.title || content.title
    content.body = req.body.body || content.body

    await repository.save(content)
    res.send(content)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// DELETE /contents/:id
router.delete('/contents/:id', async (req: express.Request, res: express.Response) => {
  try {
    const content = await repository.findOne({
      where: { id: Number(req.params.id) },
    })
    if (content == null) {
      res.status(404).send()
      return
    }

    await repository.remove(content)
    res.sendStatus(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

app.use(router)
// 3000番ポートでAPIサーバ起動
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
