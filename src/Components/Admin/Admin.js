import './Admin.css';
// import '../AddCake/AddCake.css';
import React from 'react';
import { Row, Col, Tab, ListGroup, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.svg';
import { useState } from 'react';
import AddCake from '../AddCake/AddCake';
import CakesTable from '../CakesTable/CakesTable';

const Admin = () => {
    const [cakeData, setCakeData] = useState({
        name: '',
        price: '',
        description: '',
        photoURL: ''
    });


    // onChange event of Choose file input
    const handleImageUpload = (e) => {
        console.log(e.target.files[0]);
        const imageData = new FormData();
        imageData.set("key", '4ec7e2c5c86387d0eba3b61a74395bbb');
        imageData.append('image', e.target.files[0]);

        fetch('https://api.imgbb.com/1/upload', {
            method: "POST",
            body: imageData
        })
            .then(res => res.json())
            .then(data => {
                const newCakeData = { ...cakeData };
                newCakeData.photoURL = data.data.thumb.url;
                setCakeData(newCakeData);
            })
    }

    const handleAddCake = () => {
        fetch('http://localhost:4000/addCake', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cakeData)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert("The cake is added to the database successfully");
                    const resetCakeData = {
                        name: '',
                        price: '',
                        description: '',
                        photoURL: ''
                    };
                    setCakeData(resetCakeData);
                }
            })
    }


    return (
        <div className="dash">
            <Tab.Container defaultActiveKey="#link1">
                <Row>
                    <Col className="side-bar" sm={2}>

                        <Link to="/home" className="brand"><img src={logo} alt="" style={{ maxWidth: "200px" }} /></Link>

                        <ListGroup>
                            <ListGroup.Item action variant="danger" href="#link1">
                                Manage Cakes
                            </ListGroup.Item>
                            <ListGroup.Item action variant="danger" href="#link2">
                                Add Cake
                            </ListGroup.Item>
                            <ListGroup.Item action variant="danger" href="#link3">
                                Edit Cake
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col className="dash-body" sm={10}>
                        <div className="dash-header">
                            <h1>Admin Panel</h1>
                            <Link to="/home"><Button variant='danger'>Go Home</Button></Link>
                        </div>

                        <Tab.Content className="content">
                            <Tab.Pane className="pane" eventKey="#link1">
                                <h1 className="pane-header">Manage Cakes</h1>
                                <CakesTable cakeData={cakeData}></CakesTable>
                            </Tab.Pane>
                            <Tab.Pane className="pane" eventKey="#link2">
                                <h1 className="pane-header">Add Cake</h1>
                                <AddCake cakeData={cakeData} setCakeData={setCakeData} handleImageUpload={handleImageUpload}></AddCake>
                                {
                                    cakeData.photoURL && cakeData.name && <Row className="preview">
                                        <Col>
                                            <img src={cakeData.photoURL} alt="" />
                                        </Col>
                                        <Col>
                                            <h2>Name: {cakeData.name}</h2>
                                            <p>Price: {cakeData.price}</p>
                                            <p>Cake Description: {cakeData.description}</p>
                                            <Button variant="info" onClick={handleAddCake} >Submit</Button>
                                        </Col>
                                    </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane className="pane" eventKey="#link3">
                                <h1 className="pane-header">This is Edit cake section</h1>
                            </Tab.Pane>
                        </Tab.Content>


                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Admin;