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

    // Track current group for this socket
    socket.currentGroup = null;

    // Join group room
    socket.on('join_group', (groupId) => {
      if (socket.currentGroup) {
        socket.leave(socket.currentGroup);
      }
      socket.join(groupId);
      socket.currentGroup = groupId;
    });

    socket.on('send_message', async (data) => {
      const messageData = {
        sender_id: socket.user.id,
        content: data.content,
        group_id: data.group_id, // Asegúrate de que el frontend lo envía
        created_at: new Date()
      }

      await MessageController.createFromSocket(messageData)

      // Emitir solo al grupo correspondiente
      if (messageData.group_id) {
        io.to(messageData.group_id).emit('receive_message', messageData)
      } else {
        io.emit('receive_message', messageData)
      }
    })

    socket.on('disconnect', () => {
      console.log(`👋 Usuario desconectado: ${socket.user.id}`)
    })
  })
}
