import './AddCake.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const AddCake = ({ cakeData, setCakeData, handleImageUpload }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        const newCakeData = { ...cakeData };
        newCakeData.name = data.name;
        newCakeData.price = data.price;
        newCakeData.description = data.description;
        setCakeData(newCakeData);
        e.target.reset();
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <Row>
                    <Col lg md="6" sm="12">
                        <p><label htmlFor="name">Add name</label>
                            <input className="add-cake-input" placeholder="Cake name" {...register("name", { required: true })} /></p>
                        {errors.name && <span>This field is required</span>}

                        <p><label htmlFor="price">Add Price per pound (in number)</label>
                            <input className="add-cake-input" type="number" min={0} placeholder="Cake price" {...register("price", { required: true })} /></p>
                        {errors.price && <span>This field is required</span>}
                    </Col>
                    <Col lg md="6" sm="12">
                        <p><label htmlFor="description">Description</label>
                            <input className="add-cake-input" type="text-area" placeholder="Description" {...register("description", { required: true })} /></p>
                        {errors.weight && <span>This field is required</span>}
                        <p><label htmlFor="image">Add picture</label>
                            <input className="add-cake-input" type="file" {...register("image", { required: true })} onChange={(event) => handleImageUpload(event)} /></p>
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Col>
                </Row>

                <input className="submit-btn btn" type="submit" value="Preview" />
            </form>
        </Container>
    );
};

export default AddCake;