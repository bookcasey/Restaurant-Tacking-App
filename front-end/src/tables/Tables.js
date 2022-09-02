function Tables({ tables, tablesError }) {
  function mapTables(tables) {
    return tables.map((table) => (
      <div>
        <h2 className=""> Name: {table.table_name}</h2>
        <p>Capacity: {table.capacity}</p>
        <p className="">
          {table.reservation_id ? (
            <p className="alert alert-success">Available</p>
          ) : (
            <p className="alert alert-danger">Occupied</p>
          )}
        </p>
      </div>
    ));
  }

  return (
    <div className="">
      <h2 className="pt-5 pl-4">Tables</h2>
      <div className="pl-4">{mapTables(tables)}</div>
    </div>
  );
}

export default Tables;
