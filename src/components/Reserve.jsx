import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import TimeSlotSelector from './TimeSlotSelector';

export default function Reserve({ restaurantData, reservations, setReservations }) {
    const location = useLocation()
    const navigate = useNavigate()
    const data = restaurantData || location.state?.restaurant

    console.log("Reserve: data =", data);
    console.log("Reserve: location.state =", location.state);

    const image = location.state?.image;


    useEffect(() => {
        if (!data) {
            navigate('/restaurants', { replace: true })
        }
    }, [data, navigate])

    if (!data) return <div>Redirecting...</div>

    const [selectedTime, setSelectedTime] = useState('');

    const from = location.state?.from || '/restaurants';

    const handleReserve = () => {
        if (!selectedTime) return;

        setReservations((prev) => {
            const filtered = prev.filter(
                r =>
                    !(
                        r.name === data.name &&
                        r.address === data.address &&
                        r.time === location.state?.oldTime
                    )
            );

            return [
                ...filtered,
                { name: data.name, address: data.address, time: selectedTime, image: image }
            ];
        });



        alert(`Reserved ${data.name} at ${selectedTime}`);

        navigate(from);
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={12}>
                    <Card className="shadow-sm rounded-4">
                        <Card.Body>
                            <Card.Title as="h1" className="mb-2 fs-3 fw-semibold">{data.name}</Card.Title>
                            <Card.Text className="mb-3 text-body-secondary">{data.address}</Card.Text>

                            <Form>
                                <TimeSlotSelector 
                                    data={data}
                                    reservations={reservations}
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                />

                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button
                                            variant="primary"
                                            onClick={handleReserve}
                                            disabled={!selectedTime}
                                        >
                                            Reserve
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}