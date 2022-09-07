const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservations.reservation_time");
}

function listDate(date) {
  return knex("reservations")
    .select("*")
    .where({ "reservations.reservation_date": date })
    .orderBy("reservations.reservation_time");
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": reservationId })
    .first();
}

function update(reservation) {
  return knex("reservations")
  .where({ reservation_id: reservation.reservation_id })
  .update(reservation)
  .returning("*")
  .then((reservationData) => reservationData[0])
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((reservationData) => reservationData[0]);
}

module.exports = {
  list,
  listDate,
  create,
  read,
  update,
};
