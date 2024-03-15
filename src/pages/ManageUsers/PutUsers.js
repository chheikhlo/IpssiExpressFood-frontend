import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const PutUsers = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setOpen(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/admin/put/product/${id}`, product)
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Produit Modifier avec succès !");
                    setProduct(resp.data);
                })
                .catch(error => {
                    setOpen(true);
                    setAlertMessage("Erreur lors de la modification du produit");
                    console.error('Error fetching product details:', error);
                });

        } catch (error) {
            console.error('Error updating product:', error);
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
                <h1 className="mb-4">Edit Product</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du produit</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={product.nom}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                            type="number"
                            name="prix"
                            value={product.prix}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={product.image}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>quantite</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantite"
                            value={product.quantite}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>sport</Form.Label>
                        <Form.Control
                            type="text"
                            name="sport"
                            value={product.sport}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Product
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default PutUsers;
