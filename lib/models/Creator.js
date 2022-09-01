const pool = require('../utils/pool');

module.exports = class Creator {
  id;
  name;
  linkedin;
  github;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.linkedin = row.linkedin;
    this.github = row.github;
    this.image_id = row.image_id;
  }

  static async getCreators() {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM creators  
      `
    );
    return rows.map((row) => new Creator(row));
  }
};
