import React from "react";
import { useNavigate } from 'react-router'
import restaurantsData from "../../madisonRestaurants.json"; // Adjust path if needed

export default function Restaurants() {
  const navigate = useNavigate()

  const handleReservation = (restaurant) => {
    // navigate to reserve page and pass restaurant data in state
    navigate('/reserve', { state: { restaurant } })
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Restaurants</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {Array.isArray(restaurantsData) && restaurantsData.length > 0 ? (
          restaurantsData.map((restaurant, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2>{restaurant.name}</h2>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Price:</strong> {restaurant.price}</p>
                <p><strong>Rating:</strong> {restaurant.rating} ⭐</p>
              </div>

              <button
                onClick={() => handleReservation(restaurant)}
                style={{
                  marginTop: "12px",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid #007bff",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Reserve
              </button>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
}
