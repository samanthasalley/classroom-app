const env     = require('dotenv').config(),
      pgp     = require('pg-promise')(),
      uri     = process.env.POSTGRES_URI || 'postgres://admin:iloveteaching@localhost/class_app';

const db = {
  getAll: (table) => {
    return db.conn.any(`SELECT * FROM ${table}`);
  },

  deleteById: (table, id) => {
    return db.conn.one(`DELETE FROM ONLY ${table} WHERE _id = ${id} RETURNING *`);
  }
};

db.conn = pgp(uri);

module.exports = db;