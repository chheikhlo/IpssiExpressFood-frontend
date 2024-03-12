import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const PutDish = () => {
    const { id } = useParams();
    const [dish, setDish] = useState({});

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        api.get(`/dishes/dish-details/${id}`)
            .then(resp => {
                setDish(resp.data[0]);
                console.log(dish);
                setOpen(false);
            })
            .catch(error => {
                console.error('Error fetching dish details:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDish({ ...dish, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         api.put(`/admin/put/dish/${id}`, dish)
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Plat Modifier avec succès !");
                    setDish(resp.data);
                    console.log(resp.data);
                })
                .catch(error => {
                    setOpen(true);
                    setAlertMessage("Erreur lors de la modification du plat");
                    console.error('Error fetching dish details:', error);
                });

    };

    return (

        <div className="putprod-container">
            <div>
                {open && (
                    <Alert variant="success" onClose={() => setOpen(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
            </div>
            <Container className="mt-5">
                <h1 className="mb-4">Edit Dish</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du plat</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={dish.nom}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                            type="number"
                            name="prix"
                            value={dish.prix}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={dish.image}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>quantite</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantite"
                            value={dish.quantite}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>sport</Form.Label>
                        <Form.Control
                            type="text"
                            name="sport"
                            value={dish.sport}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update dish
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default PutDish;
