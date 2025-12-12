import { Col, Card, Button } from "react-bootstrap";

export default function ReservationSidebar({ restaurant, image, navigate }) {
    return (
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
    );
}
