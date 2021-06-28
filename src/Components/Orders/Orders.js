import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Container, Spinner, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../App';
import OrderItem from '../OrderItem/OrderItem';
import './Orders.css';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (loggedInUser.email) {
            fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.length>0){
                        setOrders(data);
                        console.log(orders)
                    }
                    else{
                        const errorMessage = `There is no orders for the user with this ${loggedInUser.email} email address`;
                        setErrorMessage(errorMessage);
                        console.log(data);
                    }
                })
        }
        else {
            const errorMessage = "After login it does not found any email from firebase recent user. And without email address orders can not fetched from database since orders are fetched by email.";
            setErrorMessage(errorMessage);
        }
    }, [loggedInUser])

    // console.log(orders)
    return (
        <div className="body">
            <Container>
                <h1>Orders</h1>
                <div className="checkout-container-preview">
                    {
                        !errorMessage ? (orders[0]?.name ? (<div className="checkout-content">
                            <p>Buyer: {loggedInUser.displayName}<br />Email: {loggedInUser.email}</p>
                            <ListGroup variant="flush">
                                {
                                    orders.map(order => <OrderItem order={order}></OrderItem>)
                                }
                            </ListGroup>
                        </div>) : <div className="spinner-div"><Spinner className="spinner" size="xl" animation="border" role="status" variant="info">
                        </Spinner></div>)
                        : <p style={{ color: 'red'}}>{errorMessage}</p>
                    }

                </div>
            </Container>
        </div>
    );
};

export default Orders;