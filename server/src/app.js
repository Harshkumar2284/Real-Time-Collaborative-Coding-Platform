import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from '../src/config/db.js'
import authRoutes from '../src/routes/auth.routes.js'

dotenv.config()
connectDb()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)

export default app