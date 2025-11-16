import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import restaurantsData from "../../madisonRestaurants.json"; // adjust path
import RestaurantSummary from "../RestaurantSummary";


export default function Restaurants() {
  const handleReservation = (restaurant) => {
    alert(`You clicked Reserve for ${restaurant.title}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Restaurants in Madison
      </h1>

      {restaurantsData.length === 0 && <p>No restaurants available!</p>}

      <Row>
        {restaurantsData.map((restaurant) => (
          <Col key={restaurant.name} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <RestaurantSummary restaurant={restaurant} onReserve={handleReservation} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
