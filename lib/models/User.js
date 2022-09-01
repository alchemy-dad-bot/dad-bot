const pool = require('../utils/pool');

module.exports = class User {
  id;
  user_id;
  content;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.content = row.content;
  }
  static async insert({ user_id, content }) {
    const { rows } = await pool.query(
      `
      INSERT INTO users_dadbot (user_id, content)
      VALUES ($1, $2)
      RETURNING *
      `,
      [user_id, content]
    );
    return new User(rows[0]);
  }
  static async getRandomJoke({ user_id }) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users_dadbot OFFSET floor(random() * ( SELECT
			COUNT(*)
			FROM users_dadbot
      WHERE user_id = $1))
      LIMIT 1`,
      [user_id]
    );
    return new User(rows[0]);
  }
  static async deleteUserJoke(id) {  // Currently Working on
    const { rows } = await pool.query(
      `
      DELETE FROM users_dadbot
      WHERE id = $1
      RETURNING * ;
      `,
      [id]
    );
    return new User(rows[0]);
  }
  static async getAllUserJokes(user_id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users_dadbot
      WHERE user_id = $1 
      `,
      [user_id]
    );
    return new User(rows[0]);
  }
};
