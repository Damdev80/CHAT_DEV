// controllers/user.controller.js
import { ModelsUser } from '../models/user.js'
import { userSchema } from '../validations/user.validation.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'

export class UserController {
  static async register(req, res) {
    try {
      // Validar datos con Zod
      const result = userSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({ errors: result.error.issues })
      }
  
      const { username, email, password } = result.data // 👈🏻 Ya NO pedimos role_id
  
      // Verificar si el usuario ya existe
      const existingUser = await ModelsUser.getByUsername(username)
      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })
      }
  
      // Verificar si el email ya existe
      const existingEmail = await ModelsUser.getByEmail(email)
      if (existingEmail) {
        return res.status(400).json({ message: 'El email ya está en uso' })
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10)
  
      // Aquí asignas el rol por defecto ("user")
      const roleIdDefault = '59e2178f-21f6-11f0-ae34-047c16ab5fbc' // ← UUID real de usuario normal
  
      // Crear el usuario
      await ModelsUser.create({
        username,
        email,
        password: hashedPassword,
        role_id: roleIdDefault
      })
  
      res.status(201).json({ message: 'Usuario registrado correctamente' })
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body

      // Verificar si existe el usuario
      const user = await ModelsUser.getByUsername(username)
      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
      }

      // Generar JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role_id: user.role_id
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.status(200).json({
        message: 'Login exitoso',
        token, // ← Aquí va el token
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role_id: user.role_id
        }
      })
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getAll(req, res) {
    try {
      const users = await ModelsUser.getAll()
      res.json(users)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const user = await ModelsUser.getById(id)
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      
      res.json(user)
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}