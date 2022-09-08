import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import { previous, next, today } from "../utils/date-time";
import ListTables from "../tables/Tables";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
 today,
  setDate,
  reservations,
  setReservations,
  reservationsError,
  setReservationsError,
  tables,
  setTables,
  tablesError,
  setTablesError,
}) {

  const query = useQuery();
  const date = query.get("date") || today

  const [isLoading, setIsLoading] = useState(true);

  useEffect(loadDashboard, [date]);


  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data) => {
        setReservations(data);
      })
      .then(() => setIsLoading(false))
      // .catch(setReservationsError);
      .catch((error) => console.log(error));

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 1 * 2500);

  function areReservations() {
    if (reservations.length === 0) {
        if (isLoading) {
          return <h2>Loading...</h2>;
        } else {
          return (
            <h4 className="alert alert-primary">
              There are no reservations for this date yet...
            </h4>
          );
        }
      } else {
      return reservations.map((reservation, index) => (
        <div key={index}>
          <ListReservations reservation={reservation} />
        </div>
      ));
    }
  }

  return (
    <main style={{ display: "flex" }}>
      <div className="">
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        {areReservations()}
        <button
          className="btn btn-primary mr-2 pt-2 pb-2"
          onClick={() => {
            setDate(today());
          }}
        >
          Today
        </button>
        <button
          className="btn btn-secondary mr-2 pt-2 pb-2"
          onClick={() => {
            setDate(previous(date));
          }}
        >
          Previous Date
        </button>
        <button
          className="btn btn-secondary mr-2 pt-2 pb-2"
          onClick={() => {
            setDate(next(date));
          }}
        >
          Next Date
        </button>
      </div>
      <div>
        <ListTables tables={tables} tablesError={tablesError} />
      </div>
    </main>
  );
}

export default Dashboard;
