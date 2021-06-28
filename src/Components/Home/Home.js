import './Home.css'
import './Home';
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import Cake from '../Cake/Cake';

const Home = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/cakes')
            .then(res => res.json())
            .then(data => setCakes(data))
    }, [])
    console.log(cakes);
    return (
        <div className="body">
            <Container className="card-container">
                {
                    cakes.length ? cakes.map(cake => <Cake key={cake._id} cake={cake}></Cake>)
                        :
                        <div className="spinner-div"><Spinner className="spinner" size="xl" animation="border" role="status" variant="info">
                        </Spinner></div>
                }
            </Container>
        </div>
    );
};

export default Home;