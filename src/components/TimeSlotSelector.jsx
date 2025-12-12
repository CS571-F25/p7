import { useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';

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

export default function TimeSlotSelector({ data, reservations, selectedTime, setSelectedTime }) {
    const opensAt = milToMin(data.opens);
    const closesAt = milToMin(data.closes) - 60;

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

    useEffect(() => {
        if (availableSlots.length === 0) {
            setSelectedTime('');
            return;
        }

        if (!availableSlots.includes(selectedTime)) {
            setSelectedTime(availableSlots[0]);
        }
    }, [availableSlots]);

    return (
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
    );
}
