import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";


const Delivery = () => {
    const [ user ] = useContext(UserContext);
    const [orderItems, setOrderItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await api.get(`/user/get/order/${id}`);
                const orders = response.data;

                console.log(orders);
                const updatedOrders = [];
                for (const foodId of orders.foods_id) {
                    const foodResponse = await api.get(`/foods/get/food/${foodId}`);
                    updatedOrders.push(foodResponse.data);
                }

                setOrderItems(updatedOrders);
                console.log(orderItems);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes :', error);
            }
        };

        fetchOrderItems();
    }, []);

    useEffect(() => {
        api.get(`/user/${id}`)
            .then(resp => {
                setOrderItems(resp.data);
                console.log(orderItems);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des commandes :', error);
            });
    }, []);

    const handleConfirmOrder = async () => {
        try {
            await api.delete(`/delete/order/${user._id}`);
            window.location.href = '/menu';
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <div className="order-container">

            <div className="container mt-5">
                <h2>Total: {} €</h2>
                <h2>Frais de livraison: {} €</h2>
                <Button variant="primary" onClick={() => handleConfirmOrder()}>Confirmer Panier</Button>
                <h1>Votre Commande</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Type</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.nom}</td>
                                <td>{item.type_food}</td>
                                <td>{item.prix} €</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Delivery;
