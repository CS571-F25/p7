import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router'
import restaurantsData from "../../madisonRestaurants.json"; 
import RestaurantSummary from "../RestaurantSummary";
import RestaurantFilters from "./RestaurantFilters";

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

      <RestaurantFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        dietFilter={dietFilter}
        setDietFilter={setDietFilter}
      />

      {filteredRestaurants.length === 0 && (
        <p className="mt-3 text-body-secondary">No restaurants match your search.</p>
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
