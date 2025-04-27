import jwt from 'jsonwebtoken'
import { MessageController } from '../controllers/message.controller.js'

export function configureSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Token faltante'))

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.user = decoded // Guardamos los datos del usuario en el socket
      next()
    } catch (err) {
      next(new Error('Token inválido'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.user.id}`)

    socket.on('send_message', async (data) => {
      const messageData = {
        sender_id: socket.user.id,
        content: data.content,
        created_at: new Date()
      }

      // 3. Guardamos mensaje en la base de datos
      await MessageController.createFromSocket(messageData)

      // 4. Emitimos mensaje
      io.emit('receive_message', messageData)
    })

    socket.on('disconnect', () => {
      console.log(`👋 Usuario desconectado: ${socket.user.id}`)
    })
  })
}
