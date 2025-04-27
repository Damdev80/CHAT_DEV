// controllers/message.controller.js
import { ModelsMessage } from '../models/message.js'
import { messageSchema } from '../validations/message.validation.js'

export class MessageController {
  static async create(req, res) {
    try {
      // Validar datos con Zod
      const result = messageSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({ errors: result.error.issues })
      }

      const { content } = result.data
      const sender_id = req.user.id // ← Tomar el id del usuario autenticado

      // Crear el mensaje
      await ModelsMessage.create({ content, sender_id })

      res.status(201).json({ message: 'Mensaje enviado correctamente' })
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getAll(req, res) {
    try {
      const messages = await ModelsMessage.getAll()
      res.json(messages)
    } catch (error) {
      console.error('Error al obtener mensajes:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async createFromSocket(data) {
    try {
      const message = await messageModel.create(data)
      return message
    } catch (error) {
      console.error('Error guardando mensaje desde socket:', error)
      throw error
    }
  }

  static async getBySenderId(req, res) {
    try {
      const { senderId } = req.params
      const messages = await ModelsMessage.getBySenderId(senderId)
      res.json(messages)
    } catch (error) {
      console.error('Error al obtener mensajes del usuario:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}