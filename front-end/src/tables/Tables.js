import { updateResId } from "../utils/api";

function Tables({ tables, loadDashboard }) {

  function clickHandler(event) {
    let tableId = event.target.value;
    tableId = Number(tableId);
    if (window.confirm("Is this table ready to seat new guests?") === true) {
      updateResId(tableId)
        .then(() => loadDashboard())
        .catch((error) => console.log("error", error));
    }
  }

  function mapTables(tables) {
    return tables.map((table, index) => (
      <div key={index}>
        <h2 className=""> Name: {table.table_name}</h2>
        <p>Capacity: {table.capacity}</p>
        <div className="">
          {!table.reservation_id ? (
            <p
              data-table-id-status={table.table_id}
              className="alert alert-success"
            >
              free
            </p>
          ) : (
            <p
              data-table-id-status={table.table_id}
              className="alert alert-danger"
            >
              occupied
            </p>
          )}
        </div>
        {table.reservation_id ? (
          <button
            className="btn btn-dark mb-3"
            value={table.table_id}
            data-table-id-finish={table.table_id}
            onClick={clickHandler}
          >
            Finish
          </button>
        ) : null}
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
