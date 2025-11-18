import { HashRouter, Route, Routes, Link } from 'react-router'
import React, { useState, useEffect } from 'react'
import './App.css'

import Reservations from './components/Reservations'
import Restaurants from './components/Restaurants'
import Reserve from './components/Reserve'
import Home from './components/Home'

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

  return <HashRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/reservations">Reservations</Link>
      <Link to="/restaurants">Restaurants</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/reservations" element={<Reservations reservations={reservations}/>}></Route>
      <Route path="/restaurants" element={<Restaurants/>}></Route>
      <Route path="/reserve" element={<Reserve reservations={reservations} setReservations={setReservations}/>}></Route>

    </Routes>
  </HashRouter>
}

export default App
