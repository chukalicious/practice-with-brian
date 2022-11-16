const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find() {
  return db("questions");
}

function findById(id) {
  return db("questions").where({ id }).first();
}

async function add(question) {
  return db("questions")
    .insert(question)
    .then((ids) => {
      return findById(ids);
    });
}

function remove(id) {
  return db("questions").where({ id }).del();
}

function update(id, changes) {
  return db("questions").where({ id }).update(changes, "*");
}
