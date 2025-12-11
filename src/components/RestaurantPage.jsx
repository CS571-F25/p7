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
        return <p className="text-center">Loading...</p>;
    }

    const priceDisplay = restaurant.price
        ? "$".repeat(restaurant.price.length)
        : "$$";

    return (
        <>
            {/* Hero Image */}
            <div
                className="w-100 mb-4"
                style={{ height: "300px", overflow: "hidden" }}
            >
                <img
                    src={image}
                    alt={`${restaurant.name} restaurant`}
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
                        <h1 className="fw-bold">{restaurant.name}</h1>

                        <p className="fs-5">
                            <strong>Address:</strong> {restaurant.address}
                        </p>

                        <p className="fs-5">
                            <strong>Cuisine:</strong> {restaurant.cuisine}
                        </p>

                        <p className="fs-5">
                            <strong>Rating:</strong>{" "}
                            <span className="text-warning">
                                {"★".repeat(Math.round(restaurant.rating))}
                            </span>{" "}
                            ({restaurant.rating})
                        </p>

                        <p className="fs-5">
                            <strong>Price:</strong> {priceDisplay}
                        </p>

                        <h2 className="mt-4 h4">Hours</h2>
                        <p>
                            {formatTime(restaurant.opens)} – {formatTime(restaurant.closes)}
                        </p>

                        <h2 className="mt-4 h4">Dietary Options</h2>
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
                            <h2 className="h4" style={{ marginBottom: "1rem" }}>Reserve a Table</h2>

                            <p className="text-body-secondary">
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
                                            from: "/restaurants",
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