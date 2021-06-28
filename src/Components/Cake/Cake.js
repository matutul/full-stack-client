import './Cake.css';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Cake = (props) => {
    const { _id, name, price, description, photoURL } = props.cake;
    const [loggedInUser] = useContext(UserContext);
    const history = useHistory();
    const handleBuyNow = (id) => {
        if(loggedInUser.displayName && !loggedInUser.email){
            alert('Please verify your email address before order. Because your order will be saved by your email address.')
        }
        else{
            history.push('/checkout/'+id);
        }
    }
    return (
        <Card className="card" >
            <Card.Img className="card-img" variant="top" src={photoURL} />
            <Card.Body className="card-body">
                <Card.Title>{name}</Card.Title>
                <Card.Text className="description">
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer">
                <big className="text-info price">BDT {price}&#2547;  lb</big>
                <Button onClick={() => handleBuyNow(_id)} variant="info">Buy now</Button>
            </Card.Footer>
        </Card>
    );
};

export default Cake;