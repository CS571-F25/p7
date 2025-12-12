import { NavLink } from 'react-router'

export default function Navigation() {
  return (
    <nav className="site-navbar" aria-label="Primary">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        Home
      </NavLink>

      <NavLink
        to="/reservations"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        Reservations
      </NavLink>

      <NavLink
        to="/restaurants"
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        Restaurants
      </NavLink>
    </nav>
  );
}
