import React from 'react';

export default function Reservations({ reservations = [] }) {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Reservations</h1>
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
        </div>
    );
}