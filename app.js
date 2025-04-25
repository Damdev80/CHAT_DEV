
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import path from 'path'
import {PORT} from './src/config/config.js'

dotenv.config();

const app = express()




app.get('/', (req, res) => {
    res.send('hola')
})

app.listen(PORT, () => {
    console.log(`Tu servidor esta listo! 🟩 para arrancar http://localhost:${PORT}`) 
})