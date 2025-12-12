import React from 'react';
import { Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import restaurantsData from "../../madisonRestaurants.json";
import ReservationCard from "./ReservationCard";

export default function Reservations({ reservations = [], setReservations }) {
    const navigate = useNavigate();

    const handleChangeReservation = (res) => {
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
    };

    const handleCancelReservation = (res) => {
        setReservations(prev =>
            prev.filter(r =>
                !(r.name === res.name &&
                    r.address === res.address &&
                    r.time === res.time)
            )
        );
    };

    return (
        <Container className="text-center">
            <Row>
                <h1 className="page-title">Your Reservations</h1>
                {reservations.length === 0 ? (
                    <p>You have no reservations yet.</p>
                ) : (
                    <Row>
                        {reservations.map((res, idx) => (
                            <ReservationCard 
                                key={res.name + res.time}
                                res={res}
                                onChangeReservation={handleChangeReservation}
                                onCancelReservation={handleCancelReservation}
                            />
                        ))}
                    </Row>
                )}
            </Row>
        </Container>
    );
}