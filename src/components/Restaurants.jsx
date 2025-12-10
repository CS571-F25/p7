import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router'
import restaurantsData from "../../madisonRestaurants.json"; 
import RestaurantSummary from "../RestaurantSummary";

const images = import.meta.glob('../assets/*', {
  eager: true,
  import: 'default'
});

export default function Restaurants() {
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [dietFilter, setDietFilter] = useState("");

  const handleReservation = (restaurant) => {
    navigate('/reserve', {
      state: {
        restaurant,
        image: getImageForRestaurant(restaurant.name),
        from: '/restaurants'
      }
    });
  };

  const handleSeePage = (restaurant) => {
  navigate('/restaurant', {
    state: {
      restaurant,
      image: getImageForRestaurant(restaurant.name)
    }
  });
};

  function getImageForRestaurant(name) {
    const lower = name.toLowerCase();
    for (const path in images) {
      if (path.toLowerCase().includes(`${lower}.`)) {
        return images[path];
      }
    }
    return null;
  }

  
  const filteredRestaurants = restaurantsData.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPrice = !priceFilter || restaurant.price === priceFilter;

    const matchesRating = !ratingFilter || restaurant.rating >= parseFloat(ratingFilter);

    const matchesDiet = !dietFilter || (restaurant.dietaryOptions && restaurant.dietaryOptions.includes(dietFilter));

    return ( matchesSearch && matchesPrice && matchesRating && matchesDiet );
  });

  return (
    <Container className="text-center">
      <h1 className="page-title">Restaurants in Madison</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#555",
            fontSize: "16px",
            backgroundColor: "#f9f9f9"
          }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#555",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
            marginBottom: "10px",
          }}
        >
          <option value="">Filter by Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
      </div>

      <div>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#555",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
            marginBottom: "10px",
          }}
        >
          <option value="">Filter by Rating</option>
          <option value="4.5">4.5★ and up</option>
          <option value="4.0">4.0★ and up</option>
          <option value="3.5">3.5★ and up</option>
        </select>
      </div>

      <div>
        <select
          value={dietFilter}
          onChange={(e) => setDietFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#555",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",
          }}
        >
          <option value="">Filter by Dietary Option</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      {filteredRestaurants.length === 0 && (
        <p style={{ marginTop: "20px" }}>No restaurants match your search.</p>
      )}

      <div className="restaurant-grid">
        <Row>
          {filteredRestaurants.map((restaurant) => (
            <Col
              key={restaurant.name}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <RestaurantSummary
                restaurant={restaurant}
                image={getImageForRestaurant(restaurant.name)}
                onReserve={handleReservation}
                onSeePage={handleSeePage}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
