import React from 'react';
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import restaurantsData from "../../madisonRestaurants.json";

export default function Reservations({ reservations = [], setReservations }) {
    const navigate = useNavigate();

    return (
        <Container className="text-center">
            <Row>
                <h1 className="page-title">Your Reservations</h1>
                {reservations.length === 0 ? (
                    <p>You have no reservations yet.</p>
                ) : (
                    <Row>
                        {reservations.map((res, idx) => (
                            <Col
                                key={res.name + res.time}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <Card
                                    className="h-100 shadow-sm"
                                    style={{
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        transition: "transform 0.2s",
                                    }}>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title style={{ fontWeight: "600", fontSize: "1.25rem", fontFamily: "'Bebas Neue', sans-serif" }}>
                                            {res.name}
                                        </Card.Title>
                                        <Card.Img
                                            variant="top"
                                            src={res.image}
                                            alt={res.name}
                                            style={{
                                                width: "100%",
                                                height: "180px",
                                                objectFit: "contain",
                                                padding: "6px",
                                                borderRadius: "8px"
                                            }}
                                        />
                                        <Card.Text style={{ fontStyle: "italic", color: "#555" }}>
                                            {res.address} — <strong>{res.time}</strong>
                                        </Card.Text>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                style={{ borderRadius: "6px", marginRight: "8px" }}
                                                onClick={() => {
                                                    const restaurants = restaurantsData.find(
                                                        r => r.name === res.name && r.address
                                                    );
                                                    navigate("/reserve", {
                                                        state: {
                                                            restaurant: {
                                                                name: res.name,
                                                                address: res.address,
                                                                opens: restaurants.opens,
                                                                closes: restaurants.closes,
                                                            },
                                                            oldTime: res.time,
                                                            image: res.image,
                                                            from: '/reservations'
                                                        }
                                                    });
                                                }}
                                            >
                                                Change
                                            </Button>



                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                style={{ borderRadius: "6px" }}
                                                onClick={() => {
                                                    setReservations(prev =>
                                                        prev.filter(r =>
                                                            !(r.name === res.name &&
                                                                r.address === res.address &&
                                                                r.time === res.time)
                                                        )
                                                    );
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Row>
        </Container>
    );
}