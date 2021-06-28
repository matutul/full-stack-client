import './NotFound.css';
import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div className="body">
            <Container className="not-found">
                <h1>Not Found</h1>
                <h2>Error: 404!</h2>
            </Container>
        </div>
    );
};

export default NotFound;