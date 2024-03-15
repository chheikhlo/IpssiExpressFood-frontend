import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";

const Delivery = () => {
    const [user] = useContext(UserContext);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await api.get(`/livreur/get/order/${id}`);
                const orders = response.data;

                const updatedOrders = [];
                let totalPrice = 0;
                for (const order of orders) {
                    const foodNames = [];
                    let orderPrice = 0;
                    for (const foodId of order.foods_id) {
                        const foodResponse = await api.get(`/foods/get/food/${foodId}`);
                        foodNames.push(foodResponse.data.nom);
                        orderPrice += foodResponse.data.prix;
                    }
                    const userResponse = await api.get(`/users/${order.client_id}`);
                    updatedOrders.push({
                        foods: foodNames.join(" - "),
                        totalPrice: orderPrice,
                        orderId: order._id,
                        clientName: `${userResponse.data[0].nom} ${userResponse.data[0].prenom}`,
                        status: order.statut,
                        isDelivered: false // Ajout de la propriété isDelivered
                    });
                    totalPrice += orderPrice;
                }

                setOrderItems(updatedOrders);
                setTotalPrice(totalPrice);

            } catch (error) {
                console.error('Erreur lors de la récupération des commandes :', error);
            }
        };

        fetchOrderItems();
    }, []);

    const handleConfirmDelivery = async (orderId, index) => {
        try {
            await api.delete(`/commandes/delete/order/${orderId}`, { statut: "Livré" });

            const updatedOrders = [...orderItems];
            updatedOrders[index].status = "Livré";
            updatedOrders[index].isDelivered = true;
            setOrderItems(updatedOrders);
        } catch (error) {
            console.error('Erreur lors de la confirmation de la livraison :', error);
        }
    };

    return (
        <div className="order-container">
            <div className="container mt-5">
                <h2>A livrer</h2>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th> Détails commandes</th>
                            <th>Prix</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.clientName}</td>
                                <td>{item.foods}</td>
                                <td>{item.totalPrice.toFixed(2)} €</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleConfirmDelivery(item.orderId, index)} disabled={item.isDelivered}>Confirmer commande</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Delivery;
