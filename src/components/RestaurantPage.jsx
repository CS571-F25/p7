import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Container, Row } from "react-bootstrap";
import RestaurantDetails from "./RestaurantDetails";
import ReservationSidebar from "./ReservationSidebar";

export default function RestaurantPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const restaurant = location.state?.restaurant;
    const image = location.state?.image;

    if (!restaurant) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
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
                    <RestaurantDetails restaurant={restaurant} />
                    <ReservationSidebar restaurant={restaurant} image={image} navigate={navigate} />
                </Row>
            </Container>
        </>
    );
}