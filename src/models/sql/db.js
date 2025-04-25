import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_app',
    port: 3026
}

export const getConnection = async () => {
    try {
      const connection = await mysql.createConnection(config)
      console.log('✅ Base de datos conectada correctamente')
      return connection 
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error.message)
      throw error // Puedes lanzar el error para manejarlo donde lo uses si quieres
    }
  }



export class ModelsUser {

    static 
    
}

