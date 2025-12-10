import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function formatTime(num) {
    if (!num && num !== 0) return "N/A";

    const hour = Math.floor(num / 100);
    const minute = num % 100;
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export default function RestaurantPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const restaurant = location.state?.restaurant;
    const image = location.state?.image;

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    const priceDisplay = restaurant.price
        ? "$".repeat(restaurant.price.length)
        : "$$";

    return (
        <>
            {/* Hero Image */}
            <div
                style={{
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                    marginBottom: "2rem",
                }}
            >
                <img
                    src={image}
                    alt={restaurant.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(85%)",
                    }}
                />
            </div>

            <Container>
                <Row className="mb-4">
                    {/* Main Details */}
                    <Col lg={8}>
                        <h1 style={{ fontWeight: 700 }}>{restaurant.name}</h1>

                        <p style={{ fontSize: "1.15rem", color: "#444" }}>
                            <strong>Address:</strong> {restaurant.address}
                        </p>

                        <p style={{ fontSize: "1.15rem" }}>
                            <strong>Cuisine:</strong> {restaurant.cuisine}
                        </p>

                        <p style={{ fontSize: "1.15rem" }}>
                            <strong>Rating:</strong>{" "}
                            <span style={{ color: "#f4b400" }}>
                                {"★".repeat(Math.round(restaurant.rating))}
                            </span>{" "}
                            ({restaurant.rating})
                        </p>

                        <p style={{ fontSize: "1.15rem" }}>
                            <strong>Price:</strong> {priceDisplay}
                        </p>

                        <h4 className="mt-4">Hours</h4>
                        <p>
                            {formatTime(restaurant.opens)} – {formatTime(restaurant.closes)}
                        </p>

                        <h4 className="mt-4">Dietary Options</h4>
                        {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 ? (
                            <ul>
                                {restaurant.dietaryOptions.map((opt, idx) => (
                                    <li key={idx}>{opt}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No dietary information available.</p>
                        )}
                    </Col>

                    {/* Reservation Sidebar */}
                    <Col lg={4}>
                        <Card className="p-3 shadow-sm" style={{ borderRadius: "12px" }}>
                            <h4 style={{ marginBottom: "1rem" }}>Reserve a Table</h4>

                            <p style={{ color: "#666" }}>
                                Choose a time and complete your reservation.
                            </p>

                            <Button
                                size="lg"
                                variant="primary"
                                onClick={() =>
                                    navigate("/reserve", {
                                        state: {
                                            restaurant,
                                            image,
                                            from: "/restaurant",
                                        },
                                    })
                                }
                            >
                                Reserve Now
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}