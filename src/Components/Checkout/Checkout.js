import './Checkout.css';
import React, { useContext } from 'react';
import { Container, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Checkout = (props) => {
    const [loggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://immense-everglades-95865.herokuapp.com/cake/${id}`)
            .then(res => res.json())
            .then(data => {
                const price = parseFloat(data.price);
                const vat = (price * 12) / 100;
                const total = price + vat;
                const invoice = {
                    price: price,
                    vat: vat,
                    total: total
                }
                const newOrder = { ...loggedInUser, cake: data, invoice: invoice, orderTime: new Date() }
                setOrder(newOrder);
            })
    }, [id])
    const handlePlaceOrder = () => {
        fetch('https://immense-everglades-95865.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert("Your order is completed for " + order.cake.name);
                }
            })
    }
    console.log(order);
    return (
        <div className="body">
            <Container>
                <h1>Checkout</h1>
                <div className="checkout-container-preview">
                    {
                        order.email ? (<div className="checkout-content">
                            <Row>
                                <Col sm="3">
                                    <img src={order.cake.photoURL} alt="" />
                                </Col>
                                <Col sm="9">
                                    <h1>{order.cake.name}</h1>
                                    <p>{order.cake.description}</p>
                                    <p>BDT {order.cake.price}&#2547;</p>
                                </Col>
                            </Row>
                        </div>) : <div className="spinner-div"><Spinner className="spinner" size="xl" animation="border" role="status" variant="info">
                        </Spinner></div>
                    }

                </div>
                <div className="checkout-container">
                    {
                        order.email ? (<div className="checkout-content">
                            <p>Buyer: {order.name}<br />Email: {order.email}</p>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="cake-details" variant="light">
                                    <p>{order.cake.name}</p>
                                    <p>BDT {order.cake.price}&#2547;</p>
                                </ListGroup.Item>
                                <ListGroup.Item className="cake-details" variant="light">
                                    <p>VAT</p>
                                    <p>BDT {order.invoice.vat}&#2547;</p>
                                </ListGroup.Item>
                                <ListGroup.Item className="cake-details">
                                    <p>Total</p>
                                    <p>BDT {order.invoice.total}&#2547;</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>) : <div className="spinner-div"><Spinner className="spinner" size="xl" animation="border" role="status" variant="info">
                        </Spinner></div>
                    }
                    <Button className="place-order-btn" onClick={handlePlaceOrder} variant="info">Place Order</Button>
                </div>

            </Container>
        </div>
    );
};

export default Checkout;