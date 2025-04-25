// app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

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

// Configurar Socket.io
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// Eventos de Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id)

  // Evento para recibir mensajes
  socket.on('send_message', async (data) => {
    try {
      // Aquí podrías guardar el mensaje en la base de datos
      // usando el controlador de mensajes
      
      // Emitir el mensaje a todos los clientes conectados
      io.emit('receive_message', data)
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    }
  })

  // Evento cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id)
  })
})

// Iniciar servidor
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})