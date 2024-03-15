import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        api.get('/foods')
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error('Error fetching dishes:', error);
            });
    }, []);

    const handleAddToCart = (foodId) => {
        if (user != null) {
            api.post('/commandes/addFoodToCommand', { client_id: user._id, foods_id: [foodId], temps_estime_livraison: Math.floor(Math.random() * 21) })
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Commande ajoutée au panier");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch(error => {
                    setOpen(true);
                    setAlertMessage("Erreur lors de l'ajout de la commande");
                });
        } else {

        }
    };

    return (
        <div className="dishes-container">

            <div>
                {open && (
                    <Alert variant="success" onClose={() => setOpen(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
            </div>
            <div className="d-flex flex-wrap justify-content-center text-center">
                {dishes.map((dish, index) => (
                    <div key={dish._id} style={{ width: '40%', padding: '0.5rem' }}>
                        <Card style={{ width: '60%' }}>
                            <Card.Img variant="top" src={`images/${dish.image}`} alt={dish.nom} />
                            <Card.Body>
                                <Card.Title>{dish.nom}</Card.Title>
                                <Card.Text>Type: {dish.type_food} </Card.Text>
                                <Card.Text>Price: {dish.prix} €</Card.Text>
                                {user && user.roles === "Client" ?
                                    <Button
                                        variant="primary"
                                        onClick={() => handleAddToCart(dish._id)}
                                    >
                                        Commander
                                    </Button> :
                                    <></>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dishes;
