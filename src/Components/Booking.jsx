import React, { useState } from "react";
import FlightSearch from "./FlightSearch";
import dummyFlights from "./mockData";
import { useSnackbar } from 'notistack';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";  
import "./Booking.css";

const Booking = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [seats, setSeats] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleFlightSearch = ({ origin, destination, date}) => {
    

    const filteredFlights = dummyFlights.filter(
      (flight) =>
        flight.origin === origin &&
        flight.destination === destination &&
        flight.date === date
    );

    setFlights(filteredFlights);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };


  const handleBookingConfirm = () => {
    setBookingModalOpen(false);
    enqueueSnackbar("Booking successful!", {variant: "success"});
  };

  const openBookingModal = () => {
    setBookingModalOpen(true);
    if (selectedSeat.length < 1){
      enqueueSnackbar("Please select seats before booking", {variant: "warning"}); 
    }
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const handleSeatSelect = (seat) => {
    if (seat.available && selectedSeat.length < 3) {
      setSeats((prevSeats) =>
        prevSeats.map((s) =>
          s.id === seat.id ? { ...s, available: false } : s
        )
      );
      setSelectedSeat((prevSelectedSeats) => [...prevSelectedSeats, seat.id]);
    } else if (!seat.available && selectedSeat.includes(seat.id)) {
      setSeats((prevSeats) =>
        prevSeats.map((s) => (s.id === seat.id ? { ...s, available: true } : s))
      );
      setSelectedSeat((prevSelectedSeats) =>
        prevSelectedSeats.filter((s) => s !== seat.id)
      );
    }
  };

  return (
    <div className="flightSection">
      <FlightSearch onSearch={handleFlightSearch} />
      {flights.length > 0 ? (
        <div className="flight_searchSection">
          <h2>Flights:</h2>
          {/* <ul> */}
          <table className="table table-primary table-hover">
            <thead>
              <tr>
                <th scope="col">Id </th>
                <th scope="col">
                  Flight Name
                  {/* <img src={flight.image} alt="Flight" /> */}
                </th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Fare</th>
                <th scope="col">Date</th>

                <th scope="col">Time</th>
                <th scope="col">Ticket </th>
              </tr>
            </thead>
            {flights.map((flight) => (
              <tbody>
                <tr>
                  <th scope="row">{flight.id}</th>
                  <th scope="row">{flight.name}</th>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.fare}</td>
                  <td>{flight.date}</td>

                  <td>{flight.time}</td>
                  <td>
                    <button onClick={() => handleFlightSelect(flight)}>
                      Book Now
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ) : null}

      {selectedFlight && (
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Confirm Booking</h5>
            <p class="card-text">
              <h3>{selectedFlight.name}</h3>
              <p>
                Origin: {selectedFlight.origin} - Destination:{" "}
                {selectedFlight.destination}
              </p>
              <p>Date: {selectedFlight.date}</p>
              <p>Time: {selectedFlight.time}</p>
              <p>Available Seats:</p>
              <ul className="seating-chart">
                {selectedFlight.seats.map((seat) => (
                  <li
                    key={seat.id}
                    onClick={() => handleSeatSelect(seat)}
                    className={`seat ${
                      seat.available ? "available" : "unavailable"
                    } ${selectedSeat.includes(seat.id) ? "selected" : ""}`}
                  >
                    {seat.id}
                  </li>
                ))}
              </ul>
            </p>
            <button className="book" onClick={openBookingModal}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {bookingModalOpen && selectedSeat.length > 0 && (
        <Modal show={bookingModalOpen} onHide={closeBookingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Flight: {selectedFlight && selectedFlight.name}</p>
          <p>Seat: {selectedSeat && selectedSeat.join(", ")}</p>
          <p>Fare: {selectedFlight && selectedFlight.fare}</p>
        </Modal.Body>
        <Modal.Footer>  
          <Button variant="primary" onClick={handleBookingConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={closeBookingModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </div>
  );
};

export default Booking;
