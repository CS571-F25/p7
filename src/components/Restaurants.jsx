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

      <form
        className="search-bar"
        role="search"
        aria-label="Filter restaurants"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="mb-3 text-start">
          <label htmlFor="restaurant-search" className="form-label">
            Search restaurants
          </label>
          <input
            id="restaurant-search"
            type="search"
            className="form-control"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="price-filter" className="form-label">
            Filter by price
          </label>
          <select
            id="price-filter"
            className="form-select"
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
          >
            <option value="">Any price</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="rating-filter" className="form-label">
            Filter by rating
          </label>
          <select
            id="rating-filter"
            className="form-select"
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5★ and up</option>
            <option value="4.0">4.0★ and up</option>
            <option value="3.5">3.5★ and up</option>
          </select>
        </div>

        <div className="mb-4 text-start">
          <label htmlFor="diet-filter" className="form-label">
            Filter by dietary option
          </label>
          <select
            id="diet-filter"
            className="form-select"
            value={dietFilter}
            onChange={(event) => setDietFilter(event.target.value)}
          >
            <option value="">Any option</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>
        </div>
      </form>

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
