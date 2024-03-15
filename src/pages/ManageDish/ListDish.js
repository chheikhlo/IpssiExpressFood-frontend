import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const ListDish = () => {
    const [foods, setFoods] = useState([]);

    // Les Alerts
    const [open, setOpen] = useState(false);
    const [alertMessage] = useState("");

    useEffect(() => {
        api.get('/foods/all')
            .then(response => {
                setFoods(response.data);
            })
            .catch(error => {
                console.error('Error fetching foods:', error);
            });
    }, []);

    return (
        <div className="listprod-container">
            <div>
                {open && (
                    <Alert variant="success" onClose={() => setOpen(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="primary">
                <Link to={`/add-dish`} style={{ color: 'white', textDecoration: 'none' }}>Add Dish</Link>
            </Button>
            <div className="d-flex flex-wrap">
                {foods.map((dish) => (
                    <Card key={dish._id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Img variant="top" src={`images/${dish.photo}`} alt={dish.nom} />
                        <Card.Body>
                            <Card.Title>{dish.nom}</Card.Title>
                            <Card.Text>Price: {dish.prix} €</Card.Text>
                            <Button variant="primary">
                                <Link to={`/putdish/${dish._id}`} style={{ color: 'white', textDecoration: 'none' }}>Edit dish</Link>
                            </Button>&nbsp;&nbsp;
                            <Button variant="primary">
                                <Link to={`/deletefood/${dish._id}`} style={{ color: 'white', textDecoration: 'none' }}>Delete dish</Link>
                            </Button>

                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ListDish;
