const env     = require('dotenv').config(),
      pgp     = require('pg-promise')(),
      uri     = process.env.POSTGRES_URI || 'postgres://admin:iloveteaching@localhost/class_app';

const db = {
  getAll: (table) => {
    return db.conn.any(`SELECT * FROM ${table}`);
  }
};

db.conn = pgp(uri);

module.exports = db;