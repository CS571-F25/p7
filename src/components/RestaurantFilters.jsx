export default function RestaurantFilters({ searchTerm, setSearchTerm, priceFilter, setPriceFilter, ratingFilter, setRatingFilter, dietFilter, setDietFilter }) {
  return (
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
  );
}
