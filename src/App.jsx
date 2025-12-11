import { HashRouter, Route, Routes, Link, NavLink } from 'react-router'
import React, { useState, useEffect } from 'react'
import './App.css'

import Reservations from './components/Reservations'
import Restaurants from './components/Restaurants'
import Reserve from './components/Reserve'
import Home from './components/Home'
import RestaurantPage from "./components/RestaurantPage";

function App() {
  // reservations is an array of objects: {name, address, time}
  // Load saved reservations from localStorage (if any)
  const [reservations, setReservations] = useState(() => {
    try {
      const raw = localStorage.getItem('reservations')
      return raw ? JSON.parse(raw) : []
    } catch (err) {
      console.error('Failed to parse reservations from localStorage', err)
      return []
    }
  })

  // Persist reservations to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('reservations', JSON.stringify(reservations))
    } catch (err) {
      console.error('Failed to save reservations to localStorage', err)
    }
  }, [reservations])

  return (
    <HashRouter>
      <a className="skip-link" href="#main-content">Skip to main content</a>
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

      <main id="main-content" className="page-wrapper" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/reservations"
            element={
              <Reservations
                reservations={reservations}
                setReservations={setReservations}
              />
            }
          />

          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route
            path="/reserve"
            element={<Reserve reservations={reservations} setReservations={setReservations} />}
          />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App
