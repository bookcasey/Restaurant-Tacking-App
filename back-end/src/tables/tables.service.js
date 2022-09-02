const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name")
}

function create(newTable) {
  return knex("tables")
  .insert(newTable)
  .returning("*")
  .then(tableData=>tableData[0])
}

function read(table_id) {
  return knex("tables")
  .select("*")
  .where({ "table_id": table_id})
  .first()
}

function update(table) {
  return knex("tables")
  .where({ table_id: table.table_id })
  .update(table)
  .returning("*")
}

module.exports = {
  list,
  create,
  read,
  update,
}