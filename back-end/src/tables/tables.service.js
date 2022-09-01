const knex = require("../db/connection");

function list() {
  return knex("tables").select("*")
}

function create(newTable) {
  return knex("tables")
  .insert(newTable)
  .returning("*")
  .then(tableData=>tableData[0])
}

module.exports = {
  list,
  create
}