import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";


const Order = () => {
    const [ user ] = useContext(UserContext);
    const [orderItems, setOrderItems] = useState([]);
    const [statutOrderItems, setStatutOrderItems] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryFrais, setDeliveryFrais] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await api.get(`/user/get/order/${id}`);
                const orders = response.data;

                setStatutOrderItems(orders.statut);
                const updatedOrders = [];
                let totalPrice = 0;

                for (const foodId of orders.foods_id) {
                    const foodResponse = await api.get(`/foods/get/food/${foodId}`);
                    updatedOrders.push(foodResponse.data);
                    totalPrice += foodResponse.data.prix;
                }

                setOrderItems(updatedOrders);
                setTotalPrice(totalPrice);

                // Calcul des frais de livraison
                if (totalPrice >= 19.99) {
                    setDeliveryFrais(0);
                } else {
                    setDeliveryFrais(totalPrice / 5);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes :', error);
            }
        };

        fetchOrderItems();
    }, []);

    const handleRemoveFromCart = async (orderId) => {

    };

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
                <h2>Total: {totalPrice} €</h2>
                <h2>Frais de livraison: {deliveryFrais > 0 ? deliveryFrais : 0} €</h2>
                <h2>Status: {statutOrderItems} </h2>
                <Button variant="primary" onClick={() => handleConfirmOrder()}>Valider Commande</Button>
                <h1>Votre Commande</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Type</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.nom}</td>
                                <td>{item.type_food}</td>
                                <td>{item.prix} €</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(user.foodId)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Order;
