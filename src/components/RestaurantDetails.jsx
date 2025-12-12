import { Col } from "react-bootstrap";

function formatTime(num) {
    if (!num && num !== 0) return "N/A";

    const hour = Math.floor(num / 100);
    const minute = num % 100;
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export default function RestaurantDetails({ restaurant }) {
    const priceDisplay = restaurant.price
        ? "$".repeat(restaurant.price.length)
        : "$$";

    return (
        <Col lg={8}>
            <h1 className="fw-bold">{restaurant.name}</h1>

            <p className="fs-5">
                <strong>Address:</strong> {restaurant.address}
            </p>

            <p className="fs-5">
                <strong>Cuisine:</strong> {restaurant.cuisine}
            </p>

            <p className="fs-5">
                <strong>Rating:</strong>{" "}
                <span className="text-warning">
                    {"★".repeat(Math.round(restaurant.rating))}
                </span>{" "}
                ({restaurant.rating})
            </p>

            <p className="fs-5">
                <strong>Price:</strong> {priceDisplay}
            </p>

            <h2 className="mt-4 h4">Hours</h2>
            <p>
                {formatTime(restaurant.opens)} – {formatTime(restaurant.closes)}
            </p>

            <h2 className="mt-4 h4">Dietary Options</h2>
            {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 ? (
                <ul>
                    {restaurant.dietaryOptions.map((opt, idx) => (
                        <li key={idx}>{opt}</li>
                    ))}
                </ul>
            ) : (
                <p>No dietary information available.</p>
            )}
        </Col>
    );
}
