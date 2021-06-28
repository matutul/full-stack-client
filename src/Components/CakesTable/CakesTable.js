import './CakesTable.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const CakesTable = ({ cakeData }) => {
    const [cakes, setCakes] = useState([]);
    const [fetchDependency, setFetchDependency] = useState(true);


    useEffect(() => {
        fetch('http://localhost:4000/cakes')
            .then(res => res.json())
            .then(data => setCakes(data))
    }, [fetchDependency, cakeData])




    const handleEditCake = (id) => {
        alert("Edit action is not added yet for " + id)
    }
    const handleDeleteCake = (id) => {
        const sureToDelete = window.confirm("Are you sure you want to delete?");
        if (sureToDelete) {
            fetch('http://localhost:4000/deleteCake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert('The cake successfully deleted');
                        setFetchDependency(!fetchDependency);
                    }
                })
        }
    }
    // console.log(cakes);
    return (
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cake Name</th>
                        <th>Price Per Pound</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cakes.length ?

                            cakes.map(cake =>
                                <tr key={cake._id}>
                                    <td>{cakes.indexOf(cake) + 1}</td>
                                    <td>{cake.name}</td>
                                    <td>BDT {cake.price}&#2547;</td>
                                    <td>
                                        <Button className="edit-btn" onClick={() => handleEditCake(cake._id)} variant="info"><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button className="trash-btn" onClick={() => handleDeleteCake(cake._id)} variant="danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                    </td>
                                </tr>
                            )
                            :
                            <div className="spinner-div"><Spinner className="spinner" size="xl" animation="border" role="status" variant="info">
                            </Spinner></div>
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default CakesTable;