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

  return (<HashRouter>
    <nav className="site-navbar">
      <NavLink to="/" end className="nav-item">
        Home
      </NavLink>

      <NavLink to="/reservations" className="nav-item">
        Reservations
      </NavLink>

      <NavLink to="/restaurants" className="nav-item">
        Restaurants
      </NavLink>
    </nav>


    <div className="page-wrapper">

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/reservations"
          element={
            <Reservations
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />

        <Route path="/restaurants" element={<Restaurants />}></Route>
        <Route path="/restaurant" element={ <RestaurantPage/> } />
        <Route path="/reserve" element={<Reserve reservations={reservations} setReservations={setReservations} />}></Route>
      </Routes>

    </div>
  </HashRouter>
  );
}

export default App
