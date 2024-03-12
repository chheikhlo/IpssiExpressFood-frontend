import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    const [ user ] = useContext(UserContext);
    const navigate = useNavigate();

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        api.get('/dishes')
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error('Error fetching dishes:', error);
            });
    }, []);

    const handleAddToCart = (dishId) => {
        if (user != null) {
            api.post('/add/dish/order', { utilisateur_id: user._id, produit_id: dishId })
                .then(resp => {
                    setOpen(true);
                    setAlertMessage("Produit Ajouter aux commandes");
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
            <div className="d-flex flex-wrap">
                {dishes.map((dish) => (
                    <Card key={dish._id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Img variant="top" src={`images/${dish.image}`} alt={dish.nom} />
                        <Card.Body>
                            <Card.Title>{dish.nom}</Card.Title>
                            <Card.Text>Sport: {dish.sport} </Card.Text>
                            <Card.Text>Qte: {dish.quantite} </Card.Text>
                            <Card.Text>Price: {dish.prix} €</Card.Text>
                            {user ?

                                <Button
                                    variant="primary"
                                    onClick={() => handleAddToCart(dish._id)}

                                >
                                    Add To Cart
                                </Button> :
                                <></>
                            }
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default Dishes;
