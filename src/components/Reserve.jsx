import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

function timeToMil(timeStr) {
    const [time, ampm] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return hour * 100 + minute;
}

function milToMin(mil) {
    const hour = Math.floor(mil / 100);
    const minute = mil % 100;
    return hour * 60 + minute;
}

export default function Reserve({ restaurantData, reservations, setReservations }) {
    const location = useLocation()
    const navigate = useNavigate()
    const data = restaurantData || location.state?.restaurant
    const opensAt = milToMin(data.opens);
    const closesAt = milToMin(data.closes) - 60;
    const image = location.state?.image;


    useEffect(() => {
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

    const reservedTimesForThisRestaurant = useMemo(() => {
        const keyName = data.name;
        const keyAddress = data.address || '';
        return (reservations || [])
            .filter((r) => r.name === keyName && (r.address || '') === keyAddress)
            .map((r) => r.time);
    }, [reservations, data]);

    const allSlots = useMemo(generateTimeSlots, []);

    const availableSlots = useMemo(() => {
        return allSlots.filter((t) => {
            const military = timeToMil(t);
            const min = milToMin(military);
            const isWithinHours = min >= opensAt && min <= closesAt;
            const isNotReserved = !reservedTimesForThisRestaurant.includes(t);
            return isWithinHours && isNotReserved;
        });
    }, [allSlots, reservedTimesForThisRestaurant, opensAt, closesAt]);

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

    const from = location.state?.from || '/restaurants';

    const handleReserve = () => {
        if (!selectedTime) return;
        if (reservedTimesForThisRestaurant.includes(selectedTime)) {
            alert('This time is no longer available. Please choose a different time.');
            return;
        }

        setReservations((prev) => {
            // Remove old reservation if user is changing
            const filtered = prev.filter(
                r =>
                    !(
                        r.name === data.name &&
                        r.address === data.address &&
                        r.time === location.state?.oldTime
                    )
            );

            // Add the new reservation
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