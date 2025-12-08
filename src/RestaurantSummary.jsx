import { Card, Button } from "react-bootstrap";
import { useState } from "react";

export default function RestaurantSummary({ restaurant, image, onReserve }) {
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
  const [showMore, setShowMore] = useState(false);

  return (
    <Card
      className="h-100 shadow-sm"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.2s",

      }}
    >
      <Card.Body className="d-flex flex-column">

        <Card.Title style={{ fontWeight: "600", fontSize: "1.25rem", fontFamily: "'Bebas Neue', sans-serif" }}>
          {restaurant.name}
        </Card.Title>
        <Card.Img
          variant="top"
          src={image}
          alt={restaurant.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
            padding: "6px",
            borderRadius: "8px"
          }}
        />
        <Card.Text style={{ fontStyle: "italic", color: "#555" }}>
          {restaurant.cuisine}
        </Card.Text>


        {showMore && (
          <div>
            <Card.Text style={{ marginTop: "10px", color: "#333" }}>
              <strong>Address:</strong> {restaurant.address} <br />
              <strong>Price:</strong> {restaurant.price} <br />
              <strong>Rating:</strong> {restaurant.rating} ⭐
            </Card.Text>

            {restaurant.reservationTimes && restaurant.reservationTimes.length > 0 && (
              <div className="mb-2">
                <p style={{ marginBottom: "5px", fontWeight: "500" }}>
                  Available Reservation Times:
                </p>
                {restaurant.reservationTimes.map((time) => (
                  <Button
                    key={time}
                    size="sm"
                    variant="outline-primary"
                    className="me-2 mb-2"
                    style={{ borderRadius: "6px" }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto d-flex justify-content-between">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowMore(!showMore)}
            style={{ borderRadius: "6px" }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onReserve(restaurant)}
            style={{ borderRadius: "6px" }}
          >
            Reserve
          </Button>
        </div>
      </Card.Body>


    </Card>
  );
}
