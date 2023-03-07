import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import express, { Express, Request, Response } from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app: Express = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())
app.disable('x-powered-by')
app.use('/', router)
app.use('/', (req: Request, res: Response) => {
  res.status(404).json({ message: 'none data' })
})
export default app
