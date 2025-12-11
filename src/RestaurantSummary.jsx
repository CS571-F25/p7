import { Card, Button } from "react-bootstrap";
import { useState } from "react";

export default function RestaurantSummary({ restaurant, image, onReserve, onSeePage }) {
  const [showMore, setShowMore] = useState(false);
  const detailsId = `restaurant-details-${restaurant.name.replace(/\s+/g, "-" ).toLowerCase()}`;

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

        <Card.Title as="h3" style={{ fontWeight: "600", fontSize: "1.25rem", fontFamily: "'Bebas Neue', sans-serif" }}>
          {restaurant.name}
        </Card.Title>
        <Card.Img
          variant="top"
          src={image}
          alt={`${restaurant.name} restaurant`}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
            padding: "6px",
            borderRadius: "8px"
          }}
        />
        <Card.Text className="fst-italic text-body-secondary">
          {restaurant.cuisine}
        </Card.Text>


        {showMore && (
          <div id={detailsId}>
            <Card.Text style={{ marginTop: "10px" }}>
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
                  <span
                    key={time}
                    className="badge text-bg-primary rounded-pill me-2 mb-2"
                  >
                    {time}
                  </span>
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
            aria-expanded={showMore}
            aria-controls={detailsId}
            style={{ borderRadius: "6px" }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onSeePage(restaurant)}
            style={{ borderRadius: "6px" }}
          >
            View
          </Button>
        </div>
      </Card.Body>


    </Card>
  );
}
