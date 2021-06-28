import React from 'react';
import { ListGroup } from 'react-bootstrap';

const OrderItem = (props) => {
    const { cake, invoice, orderTime } = props.order;
    console.log(props.order);
    const deliveryDate = new Date(orderTime);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return (
        <ListGroup.Item className="cake-details" variant="light">
            <p>{cake.name}</p>
            <p>Price: BDT {invoice.price}&#2547;</p>
            <p>Vat: BDT {invoice.vat}&#2547;</p>
            <p>Total Price: BDT {invoice.total}&#2547;</p>
            <p>Order Time: {new Date(orderTime).getDate()}/{new Date(orderTime).getMonth()}/{new Date(orderTime).getFullYear()}</p>
            <p>Possible delivery in: {new Date(deliveryDate).getDate()}/{new Date(deliveryDate).getMonth()}/{new Date(deliveryDate).getFullYear()}</p>
        </ListGroup.Item>
    );
};

export default OrderItem;