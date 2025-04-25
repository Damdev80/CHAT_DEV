export class ModelsRole {
    static async create({ name, description }) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'INSERT INTO roles (id, name, description) VALUES (UUID(), ?, ?)',
        [name, description || null]
      )
      connection.end()
      return result
    }
  
    static async getById(id) {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT id, name, description, created_at FROM roles WHERE id = ?',
        [id]
      )
      connection.end()
      return rows[0]
    }
  
    static async getByName(name) {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT * FROM roles WHERE name = ?',
        [name]
      )
      connection.end()
      return rows[0]
    }
  
    static async getAll() {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT id, name, description, created_at FROM roles'
      )
      connection.end()
      return rows
    }
  
    static async update(id, { name, description }) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'UPDATE roles SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
      )
      connection.end()
      return result
    }
  
    static async delete(id) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'DELETE FROM roles WHERE id = ?',
        [id]
      )
      connection.end()
      return result
    }
  }