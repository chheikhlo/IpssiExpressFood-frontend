import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";

const Order = () => {
    const [user] = useContext(UserContext);
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

                console.log(orders[0]);
                setStatutOrderItems(orders[0].statut);
                const updatedOrders = [];
                let totalPrice = 0;

                for (const foodId of orders[0].foods_id) {
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
        try {
            await api.delete(`/commandes/delete/order/${orderId}`);
            const updatedOrders = orderItems.filter(item => item._id !== orderId);
            setOrderItems(updatedOrders);
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande :', error);
        }
    };

    const handleValidFromOrders = async () => {
        try {
            const response = await api.post(`/commandes/attributeCommand`, { _id: id });
            console.log(response);
            const id_livreur = response.data.livreurUserId;

            const clientItems = await api.get(`/users/${id}`);
            console.log("le client :"+ JSON.stringify(clientItems));

            const livreurItems = await api.get(`/users/${id_livreur}`)

            alert(`Détails de la Commande\n\n: CLIENT\nNom: ${clientItems.data[0].nom} \nPrénom: ${clientItems.data[0].prenom} \nAdresse: ${clientItems.data[0].adress}\nNuméro:  ${clientItems.data[0].numero}\n\n LIVREUR\nNom: ${livreurItems.data[0].nom} \nPrénom: ${livreurItems.data[0].prenom} \nAdresse: ${livreurItems.data[0].adress}\nNuméro:  ${livreurItems.data[0].numero}\n`);
        } catch (error) {
            console.error('Erreur lors de la validation de la commande :', error);
        }
    };

    return (
        <div className="order-container">
            <div className="container mt-5">
                <h2>Total: {totalPrice} €</h2>
                <h2>Frais de livraison: {deliveryFrais > 0 ? deliveryFrais : 0} €</h2>
                <h2>Status: {statutOrderItems} </h2>
                <Button variant="primary" onClick={() => handleValidFromOrders()}>Valider Commande</Button>
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
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(item._id)}>Delete</Button>
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
