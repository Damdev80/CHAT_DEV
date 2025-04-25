// src/sockets/socket.js
export const configureSockets = (io) => {
    io.on('connection', (socket) => {
      console.log('Usuario conectado:', socket.id)
  
      // Escuchar evento de mensaje
      socket.on('send_message', async (data) => {
        try {
          // Aquí puedes guardar el mensaje en la BD si quieres
          io.emit('receive_message', data)
        } catch (error) {
          console.error('Error al enviar mensaje:', error)
        }
      })
  
      socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id)
      })
    })
  }
  