const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  console.log(data)
  res.json ({
    data
  })
}

async function create(req,res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
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

const TableNameLength = (req, res, next) =>{
    const { data = {} } = req.body;
    tableName = data.table_name
    
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("table_name"),
    bodyDataHas("table_capacity"),
    asyncErrorBoundary(create)
  ]
}