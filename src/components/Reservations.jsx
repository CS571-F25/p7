import React from 'react';
import { Row, Col } from "react-bootstrap";

export default function Reservations({ reservations = [] }) {
    return (
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1 className="page-title">Your Reservations</h1>
                    {reservations.length === 0 ? (
                    <p>You have no reservations yet.</p>
                    ) : (
                    <div>
                        {reservations.map((res, idx) => (
                            <div key={`${res.name}-${res.address}-${idx}`} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                                <h3 style={{ margin: 0 }}>{res.name}</h3>
                                <p style={{ margin: 0 }}>{res.address} — <strong>{res.time}</strong></p>
                            </div>
                        ))}
                    </div>
            )}
                </Col>
            </Row>
    );
}