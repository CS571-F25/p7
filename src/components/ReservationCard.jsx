import { Col, Card, Button } from "react-bootstrap";

export default function ReservationCard({ res, onChangeReservation, onCancelReservation }) {
    return (
        <Col
            key={res.name + res.time}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
        >
            <Card className="h-100 shadow-sm rounded-4">
                <Card.Body className="d-flex flex-column">
                    <Card.Title as="h2" className="fs-5 fw-semibold">
                        {res.name}
                    </Card.Title>
                    <Card.Img
                        variant="top"
                        src={res.image}
                        alt={`${res.name} reservation`}
                        className="w-100"
                        style={{
                            height: "180px",
                            objectFit: "contain",
                            padding: "6px",
                            borderRadius: "8px"
                        }}
                    />
                    <Card.Text className="fst-italic text-body-secondary">
                        {res.address} — <strong>{res.time}</strong>
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="rounded-2 me-2"
                            onClick={() => onChangeReservation(res)}
                        >
                            Change
                        </Button>



                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-2"
                            onClick={() => onCancelReservation(res)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}
