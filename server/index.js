import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import favRoutes from './routes/favs.js'
const dbUrl = process.env.DBURL;
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/favs',favRoutes)

const CONNECTION_URL=dbUrl
const PORT = process.env.PORT;
app.use(express.static('public'))

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Running on port ${PORT}`)))
.catch((error)=>console.log(error.message))



