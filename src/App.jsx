import { HashRouter, Route, Routes, Link } from 'react-router'
import './App.css'
import Home from './components/Home'
import Reservations from './components/Reservations'
import Restaurants from './components/Restaurants'

function App() {
  return <HashRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/reservations">Reservations</Link>
      <Link to="/restaurants">Restaurants</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/reservations" element={<Reservations/>}></Route>
      <Route path="/restaurants" element={<Restaurants/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
