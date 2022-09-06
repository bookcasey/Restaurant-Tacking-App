import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations, listTables, updateTable } from "../utils/api";

function SeatReservation({
  reservations,
  setReservations,
  reservationsError,
  setReservationsError,
  tables,
  setTables,
  tablesError,
  setTablesError,
  date,
}) {
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const params = useParams();

  console.log(params)

  let currentReservation =
    reservations.length > 0
      ? reservations.find(
          (reservation) => reservation.reservation_id === Number(params.reservation_id)
        )
      : "loading";

  const [currentTable, setCurrentTable] = useState({table_id : "null"});
  const [error, setError] = useState(null);
  const [isNull, setIsNull] = useState();

  function mapAvailableTables() {
    const availableTables = tables.filter((table) => !table.reservation_id);

    return availableTables.map((table, index) => {
      return (
        <option key={index} value={table.table_id}>
          {table.table_name}
        </option>
      );
    });
  }

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    const foundTable = tables.find((table) => (table.table_id = value));
    setCurrentTable({
      table_id: foundTable.table_id,
      reservation_id: params.reservation_id,
    });
  };



  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (currentTable.table_id === "null" ) {
      setIsNull(true);
    } else {
      updateTable(currentTable)
        .then(() => {
          history.push("/reservations");
        })
        .catch((error) => setError(error));
    }
  };

console.log(reservations)

  return (
    <>
      <h2>
        Seating {currentReservation.first_name} {currentReservation.last_name}
      </h2>
      <form onSubmit={submitHandler} name="firstName">
        <h3>Available tables</h3>
        <select onChange={handleChange}>
          <option value="null">None</option>
          {tables.length > 0 ? mapAvailableTables() : "Loading..."}
        </select>
        <button type="submit">Seat</button>
        <button onClick={() => history.go(-1)}>cancel</button>
      </form>
      <ErrorAlert error={error} />
      {isNull ? (
        <div className="alert alert-danger m-2">Please select a table</div>
      ) : null}
    </>
  );
}

export default SeatReservation;
