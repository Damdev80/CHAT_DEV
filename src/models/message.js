export class ModelsMessage {
    static async create({ content, sender_id }) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'INSERT INTO messages (id, content, sender_id) VALUES (UUID(), ?, ?)',
        [content, sender_id]
      )
      connection.end()
      return result
    }
  
    static async getById(id) {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT id, content, sender_id, created_at FROM messages WHERE id = ?',
        [id]
      )
      connection.end()
      return rows[0]
    }
  
    static async getBySenderId(sender_id) {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT * FROM messages WHERE sender_id = ? ORDER BY created_at DESC',
        [sender_id]
      )
      connection.end()
      return rows
    }
  
    static async getAll() {
      const connection = await getConnection()
      const [rows] = await connection.execute(
        'SELECT m.id, m.content, m.created_at, u.username as sender_name FROM messages m LEFT JOIN users u ON m.sender_id = u.id ORDER BY m.created_at DESC'
      )
      connection.end()
      return rows
    }
  
    static async update(id, { content }) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'UPDATE messages SET content = ? WHERE id = ?',
        [content, id]
      )
      connection.end()
      return result
    }
  
    static async delete(id) {
      const connection = await getConnection()
      const [result] = await connection.execute(
        'DELETE FROM messages WHERE id = ?',
        [id]
      )
      connection.end()
      return result
    }
  }