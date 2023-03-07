import dotenv from 'dotenv'
dotenv.config()
import { createServer } from 'http'
import app from './app'
import io from './socket'
const port = Number(process.env.PORT)
const server = createServer(app)
io.attach(server)
server.on('error', (err) => {
  console.error('server error' + err)
})
server.once('listening', () => {
  if (process.env.NODE_DEV !== 'production') {
    console.info(`http://localhost:${port}`)
  }
})
server.listen(3000)
