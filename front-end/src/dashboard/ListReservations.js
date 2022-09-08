

function ListReservations({ reservation }) {
  function seatButton() {
    if (reservation.status === "booked") {
      return (
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button className="btn btn-dark mb-3">Seat</button>
        </a>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="div">
      <div>
        <h2>{`${reservation.first_name} ${reservation.last_name}'s Reservation`}</h2>
      </div>
      <div className="">{seatButton()}</div>
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
      <div>
        <h6>Status</h6>
        <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
      </div>
    </div>
  );
}

export default ListReservations;
