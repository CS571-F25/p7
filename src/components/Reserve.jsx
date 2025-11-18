import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

export default function Reserve({ restaurantData, reservations, setReservations }) {
    const location = useLocation()
    const navigate = useNavigate()
    const data = restaurantData || location.state?.restaurant

    useEffect(() => {
        // If there's no restaurant data (user navigated directly), send them back
        if (!data) {
            navigate('/restaurants', { replace: true })
        }
    }, [data, navigate])

    if (!data) return <div>Redirecting...</div>

    // Helper to generate time slots from 8:00 AM to 10:00 PM in 30 minute increments
    const generateTimeSlots = () => {
        const slots = [];
        for (let minutes = 8 * 60; minutes <= 22 * 60; minutes += 30) {
            const hour24 = Math.floor(minutes / 60);
            const minute = minutes % 60;
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
            const padded = minute === 0 ? '00' : String(minute).padStart(2, '0');
            slots.push(`${hour12}:${padded} ${ampm}`);
        }
        return slots;
    };

    // Compute reserved times for this restaurant using name & address as a key
    const reservedTimesForThisRestaurant = useMemo(() => {
        const keyName = data.name;
        const keyAddress = data.address || '';
        return (reservations || [])
            .filter((r) => r.name === keyName && (r.address || '') === keyAddress)
            .map((r) => r.time);
    }, [reservations, data]);

    const allSlots = useMemo(generateTimeSlots, []);

    // Avoid changing dropdown options reference every render — memoize available slots
    const availableSlots = useMemo(
        () => allSlots.filter((t) => !reservedTimesForThisRestaurant.includes(t)),
        [allSlots, reservedTimesForThisRestaurant]
    );

    // Start empty; we'll set to a reasonable default only when needed
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Set default selected time only if the current selection is no longer available
        if (availableSlots.length === 0) {
            setSelectedTime('');
            return;
        }

        if (!availableSlots.includes(selectedTime)) {
            setSelectedTime(availableSlots[0]);
        }
    }, [availableSlots]);

    const handleReserve = () => {
        if (!selectedTime) return;
        if (reservedTimesForThisRestaurant.includes(selectedTime)) {
            // This should rarely happen because we filter on the select, but guard anyway
            alert('This time is no longer available. Please choose a different time.');
            return;
        }

        // Append to reservations array in parent (App)
        setReservations((prev) => [
            ...prev,
            { name: data.name, address: data.address, time: selectedTime },
        ]);

        // Optionally, inform the user
        alert(`Reserved ${data.name} at ${selectedTime}`);
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col  lg={12}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-2">{data.name}</Card.Title>
                            <Card.Text className="mb-3">{data.address}</Card.Text>

                            <Form>
                                <Form.Group controlId="time-select" className="mb-3">
                                    <Form.Label>Select a time</Form.Label>
                                    <Form.Select
                                        aria-label="Select reservation time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        disabled={availableSlots.length === 0}
                                    >
                                        {availableSlots.length === 0 ? (
                                            <option value="">No available times</option>
                                        ) : (
                                            availableSlots.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))
                                        )}
                                    </Form.Select>
                                </Form.Group>

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