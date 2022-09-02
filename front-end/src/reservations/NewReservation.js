import { useState } from "react";
import { useHistory } from "react-router";
import { createRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
export default function NewReservation({ date, setDate }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setNewReservation({ ...newReservation, [target.name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    newReservation.people = Number(newReservation.people); //to change string to number so that it fits the api criteria
    createRes(newReservation)
      .then(() => {
        setDate(newReservation.reservation_date);
        history.push("/reservations");
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="first_name"
            value={newReservation.first_name}
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={newReservation.last_name}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="mobile_number"
            value={newReservation.mobile_number}
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={newReservation.people}
            placeholder="Party Size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={newReservation.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="time"
            name="reservation_time"
            value={newReservation.reservation_time}
            onChange={handleChange}
          />
        </div>
        <button type="submit">submit</button>
      <button onClick={() => history.push("/reservations")}>cancel</button>
      </form>
      <ErrorAlert error={error} />
    </>
  );
}
