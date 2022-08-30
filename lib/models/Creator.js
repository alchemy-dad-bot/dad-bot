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
  }

  static async getCreators() {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM creators  
      `
      // Continue Creators From Here
    );
    return rows.map((row) => new row[0]);
  }
};
