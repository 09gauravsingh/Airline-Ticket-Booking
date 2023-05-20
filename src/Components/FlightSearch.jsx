import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./Booking.css";

const FlightSearch = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Perform search logic or fetch flight data from an API based on the selected origin, destination, and date
    // Pass the search parameters to the parent component
    onSearch({ origin, destination, date });
  };

  return (
    <div className="mainSection">
      {/* <div className="card_section"> */}
        <div >
          <h2 className="heading">Flight Search</h2>
          <form onSubmit={handleSearch}>
            <label className="card-search">Origin:</label>
            <select value={origin} onChange={handleOriginChange}>
              <option value="">Select origin</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
            <label className="card-search">Destination:</label>
            <select value={destination} onChange={handleDestinationChange}>
              <option value="">Select destination</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Patna">Patna</option>
            </select>
            <label className="card-search">Date:</label>
            <input type="date" value={date} onChange={handleDateChange} />
            <button className="card_search " type="submit">Search</button>
          </form>
        </div>
      </div>
    // </div>
  );
};

export default FlightSearch;
