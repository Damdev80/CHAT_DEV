import { ModelsGroup } from '../models/group.js'

export class GroupController {
  static async create(req, res) {
    try {
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'El nombre es requerido' })
      await ModelsGroup.create({ name })
      res.status(201).json({ message: 'Grupo creado correctamente' })
    } catch (error) {
      console.error('Error al crear grupo:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getAll(req, res) {
    try {
      const groups = await ModelsGroup.getAll()
      res.json(groups)
    } catch (error) {
      console.error('Error al obtener grupos:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      await ModelsGroup.update(id, { name })
      res.json({ message: 'Grupo actualizado correctamente' })
    } catch (error) {
      console.error('Error al actualizar grupo:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      await ModelsGroup.delete(id)
      res.json({ message: 'Grupo eliminado correctamente' })
    } catch (error) {
      console.error('Error al eliminar grupo:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
