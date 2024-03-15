import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AddFood = () => {
    const [food, setFood] = useState({});

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood({ ...food, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/foods/admin/add/food', food)
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Plat Ajouter avec succès !");
                })
                .catch(error => {
                    setOpen(true);
                    setAlertMessage("Erreur lors de l'ajout du nouveau food");
                });

        } catch (error) {
            console.error('Error adding food:', error);
        }
    };

    return (
        <>
            <div>
                {open && (
                    <Alert variant="success" onClose={() => setOpen(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
            </div>
            <Container className="mt-5">
                <h1 className="mb-4">Add a food</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du food </Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={food.nom}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description </Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={food.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>prix</Form.Label>
                        <Form.Control
                            type="number"
                            name="prix"
                            value={food.prix}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type food (plat/dessert)</Form.Label>
                        <Form.Control
                            type="text"
                            name="type_food"
                            value={food.type_food}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Photo </Form.Label>
                        <Form.Control
                            type="text"
                            name="photo"
                            value={food.photo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add food
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AddFood;
