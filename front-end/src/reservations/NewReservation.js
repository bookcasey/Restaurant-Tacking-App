import { useState } from "react";
import { useHistory } from "react-router";
import { createRes } from "../utils/api";
export default function NewReservation({ date, setDate }) {
  const history = useHistory();
  const [tuesday, setTuesday] = useState();
  const [pastDate, setPastDate] = useState(false);
  const [pastTuesday, setPastTuesday] = useState(false);
  const [storeClosed, setStoreClosed] = useState();
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
    // console.log(newReservation.people);
    const day = new Date(newReservation.reservation_date)
    const dayOf = day.getUTCDay()
    const time = newReservation.reservation_time
    const currentDate = new Date()
    if(dayOf === 2 && day < currentDate){
      setPastTuesday(true)
      return
    }
    if(dayOf === 2 ){
      setTuesday(true)
      return 
    }
    if( day < currentDate ){
      setPastDate(true)
      return
    }
    if(currentDate < time) {
      setStoreClosed(true)
      console.log(`past time`)
      return
    }
    if(time < `10:30` || time > `20:30`){
      setStoreClosed(true)
      console.log(`outside store hours`)
      return
    }
    createRes(newReservation)
    setDate(newReservation.reservation_date)
    history.push("/reservations");
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
      </form>
      <button onClick={() => history.push("/reservations")}>cancel</button>
      {pastTuesday || tuesday ? (
        <p className="alert alert-danger">
          The restaurant is closed on Tuesdays. Please make a
          reservation for another date.
        </p>
      ) : null}
      {pastDate ? (
        <p className="alert alert-danger">
          The reservation must be for a future date. Please make a reservation for future date.
        </p>
      ) : null}
      {storeClosed ? <p className="alert alert-danger">The restaurant is closed during this time. Open hours are 10:30 AM - 8:30 PM</p> : null}
    </>
  );
}
