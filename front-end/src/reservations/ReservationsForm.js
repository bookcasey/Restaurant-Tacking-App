import { useHistory } from "react-router";

function ReservationsForm({
  submitHandler,
  reservation,
  setReservation,
  error,
  ErrorAlert,
}) {
  const history = useHistory();

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setReservation({ ...reservation, [target.name]: value });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="first_name"
            value={reservation.first_name}
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={reservation.last_name}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="mobile_number"
            value={reservation.mobile_number}
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={reservation.people}
            placeholder="Party Size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={reservation.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="time"
            name="reservation_time"
            value={reservation.reservation_time}
            onChange={handleChange}
          />
        </div>
        <button type="submit">submit</button>
        <button onClick={() => history.push("/dashboard")}>cancel</button>
      </form>
      <ErrorAlert error={error} />
    </>
  );
}

export default ReservationsForm;
