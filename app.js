// app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { configureSocket } from './src/config/socket.io.js'
import { serverError } from './src/middlewares/error.middlewar.js' 

// Importar rutas
import userRoutes from './src/routes/user.routes.js'
import roleRoutes from './src/routes/role.routes.js'
import messageRoutes from './src/routes/message.routes.js'

// Configurar variables de entorno
dotenv.config()

// Inicializar Express
const app = express()
const server = http.createServer(app)

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/messages', messageRoutes)

app.use(serverError)

// Configurar Socket.io
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

configureSocket(io)





// Iniciar servidor
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})