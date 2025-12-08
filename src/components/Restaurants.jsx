import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router'
import restaurantsData from "../../madisonRestaurants.json"; // adjust path
import RestaurantSummary from "../RestaurantSummary";
const images = import.meta.glob('../assets/*', {
  eager: true,
  import: 'default'
});


export default function Restaurants() {
  //<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
  const navigate = useNavigate()

  const handleReservation = (restaurant) => {
    // navigate to reserve page and pass restaurant data in state
    navigate('/reserve', { state: { restaurant } })
  };

  function getImageForRestaurant(name) {
    const lower = name.toLowerCase();

    // Find matching file by checking file path
    for (const path in images) {
      if (path.toLowerCase().includes(`${lower}.`)) {
        return images[path]; // Returns the resolved image URL
      }
    }

    return null;
  }



  return (
    <Container className="text-center">

      <h1 className="page-title">
        Restaurants in Madison
      </h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#555",
            fontSize: "16px",
            backgroundColor: "#f9f9f9"
          }}
        />
      </div>



      {restaurantsData.length === 0 && <p>No restaurants available!</p>}

      <div className="restaurant-grid">
        <Row>
          {restaurantsData.map((restaurant) => (
            <Col
              key={restaurant.name}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <RestaurantSummary
                restaurant={restaurant}
                image={getImageForRestaurant(restaurant.name)}
                onReserve={handleReservation}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
