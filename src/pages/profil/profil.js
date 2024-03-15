import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";

const Profil = () => {
    const { id } = useParams();
    const [userToPut, setUserToPut] = useState({});
    const [user] = useContext(UserContext);

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        api.get(`/users/${id}`)
            .then(resp => {
                setUserToPut(resp.data[0]);
                setOpen(false);
            })
            .catch(error => {
                console.error('Error fetching profil details:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserToPut({ ...userToPut, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/put/user/${id}`, userToPut)
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Profil Modifier avec succès !");
                    setUserToPut(resp.data);
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
        <div className="profil-container">

            <div>
                {open && (
                    <Alert variant="success" onClose={() => setOpen(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
            </div>

            {user ?
                (user.roles.length !== 2 ?
                    <Link to={`/delete/user/${id}`}>
                        <Button variant="primary" type="submit">
                            Se desinscrire
                        </Button>
                    </Link> :
                    <></>) :
                <></>
            }

            <Container className="mt-5">
                <h1 className="mb-4">Edit Profil</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={userToPut.nom}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prénom"
                            value={userToPut.prenom}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Télephone</Form.Label>
                        <Form.Control
                            type="number"
                            name="numero"
                            value={userToPut.numero}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={userToPut.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>mot de passe</Form.Label>
                        <Form.Control
                            type="text"
                            name="mot_de_passe"
                            value={userToPut.mot_de_passe}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>adress</Form.Label>
                        <Form.Control
                            type="text"
                            name="adress"
                            value={userToPut.adress}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Profil
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Profil;
