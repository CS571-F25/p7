import React from 'react'
import { Link } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router'
import './Home.css'

function Home(props) {
    const navigate = useNavigate()
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1 className="home-title">Madtown Munch</h1>
                    <p className="subtitle">
                    Discover your new favorite restaurants in Madison and make a reservation instantly!
                    </p>
                
                <Row className="justify-content-center mt-4 card-row" role="list">
                    <Col md={5} role="listitem">
                        <button
                            type="button"
                            className="click-card search-bar-card"
                            onClick={() => navigate("/restaurants")}
                        >
                            <h2>Explore Restaurants!</h2>
                            <p>Browse a list of Madison’s favorite dining spots.</p>
                        </button>
                    </Col>

                    <Col md={5} role="listitem">
                        <button
                            type="button"
                            className="click-card reservations-card"
                            onClick={() => navigate("/reservations")}
                        >
                            <h2>Already have a place in mind?</h2>
                            <p>Make a reservation!</p>
                        </button>
                    </Col>
                </Row>    
                </Col>
            </Row>
        </Container>
  );
}

export default Home