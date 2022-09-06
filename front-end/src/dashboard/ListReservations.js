import { useHistory } from "react-router-dom";

function ListReservations({ reservation }) {
  return (
    <div className="div" >
      <div>
        <h2>{`${reservation.first_name} ${reservation.last_name}'s Reservation`}</h2>
      </div>
      <div className="">
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
        <button className="btn btn-dark mb-3">Seat</button>
        </a>
      </div>
      <div>
        <h6>Check-in Time</h6>
        <p>{reservation.reservation_time}</p>
      </div>
      <div>
        <h6>Reservation Date</h6>
        <p>{reservation.reservation_date}</p>
      </div>
      <div>
        <h6>Guest Amount</h6>
        <p>{reservation.people}</p>
      </div>
      <div>
        <h6>Contact Info</h6>
        <p>{reservation.mobile_number}</p>
      </div>
    </div>
  );
}

export default ListReservations;
