const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const resService = require("../reservations/reservations.service")

async function list(req, res) {
  const data = await service.list()
  res.json ({
    data
  })
}

async function readTable( req, res, next) {
  const data = await service.read(req.params.table_id)
  if(data) {
    res.locals.table = data
    return next()
  }
  return next({ status: 404, message: `${req.params.table_id} not found`})
}

async function readRes(req, res, next) {
  const data = await resService.read(req.body.data.reservation_id)
  if(data){
    res.locals.reservation = data
    return next()
  }
  return next({ status: 404, message: `${req.body.data.reservation_id} not found`})
}

async function create(req,res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}


async function update(req, res) {
  const tableId = req.params.table_id
  const tableData = req.body.data
  const updatedTable = {
    ...tableData,
    table_id: tableId
  }
  const data = await service.update(updatedTable)
  res.json({ data })
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function isOneChar(req, res, next) {
  const {data = {}} = req.body
  const name = data.table_name;
  if(name.length>1){
    return next()
  }
  return next({ status: 400, message: 'table_name must be at least 2 characters'})
}

function isInteger(req,res,next) {
  const {data = {}} = req.body
  if(Number.isInteger(data.capacity)){
    return next()
  }
  return next({ status: 400, message: `capacity must be a number`})
}


function capacity(req,res,next) {
  const reservation = res.locals.reservation.people
  const table = res.locals.table.capacity
  if( reservation  > table  ){
    return next({ status : 400, message: `table does not have sufficient capacity`})
  }
  return next()
}

function occupied(req,res,next){
  let occupied = res.locals.table.reservation_id
  if(occupied){
    return next( {status: 400, message: `table is occupied`})
  }
  return next()
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(bodyDataHas("table_name")),
    asyncErrorBoundary(isOneChar),
    bodyDataHas("capacity"),
    asyncErrorBoundary(isInteger),
    asyncErrorBoundary(create)
  ],
  // read: [readRes,read],
  update: [
    asyncErrorBoundary(bodyDataHas("reservation_id")),
    asyncErrorBoundary(readRes),
    asyncErrorBoundary(readTable),
    asyncErrorBoundary(capacity),
    asyncErrorBoundary(occupied),
    asyncErrorBoundary(update)]
}