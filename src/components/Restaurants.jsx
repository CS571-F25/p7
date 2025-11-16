import React from "react";


export default function Restaurants(props) {
  
  // Sample restaurant data
  const restaurant = {
    name: "Graze",
    address: "1 S Pinckney St, Madison, WI 53703",
    cuisine: "Farm-to-Table / Gastropub",
    price: "$$",
    rating: 4.3,
    reservationTimes: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]
  };

  const handleReservation = (time) => {
    alert(`You selected a reservation at ${time} for ${restaurant.name}`);
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Restaurants</h1>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <h2>{restaurant.name}</h2>
        <p>
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p>
          <strong>Cuisine:</strong> {restaurant.cuisine}
        </p>
        <p>
          <strong>Price:</strong> {restaurant.price}
        </p>
        <p>
          <strong>Rating:</strong> {restaurant.rating} ⭐
        </p>

        <div>
          <p>
            <strong>Available Reservation Times:</strong>
          </p>
          <button
          onClick={handleReservation}
          style={{
            marginTop: "12px",
            padding: "10px 20px",
            borderRadius: "4px",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >Reserve</button>
        </div>
      </div>
    </div>
  );
}
