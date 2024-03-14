import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";


const Delivery = () => {
    const [user] = useContext(UserContext);
    const [orderItems, setOrderItems] = useState([]);
    const [statutOrderItems, setStatutOrderItems] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryFrais, setDeliveryFrais] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await api.get(`/livreur/get/order/${id}`);
                const orders = response.data;
                console.log('commandess', orders);
                console.log('commandess', orders.length);

                setStatutOrderItems(orders.statut);
                const updatedOrders = [];
                let totalPrice = 0;
                // for (const order of orders) {
                for (const foodId of orders.foods_id) {
                    const foodResponse = await api.get(`/foods/get/food/${foodId}`);
                    updatedOrders.push(foodResponse.data);
                    totalPrice += foodResponse.data.prix;
                    // }

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

    const handleConfirmDelivery = async () => {
        // try {
        // await api.delete(`/delete/order/${user._id}`);
        // window.location.href = '/menu';
        // } catch (error) {
        //     console.error('Error deleting:', error);
        // }
    };

    return (
        <div className="order-container">
            <div className="container mt-5">
                <h2>Frais de livraison: {deliveryFrais > 0 ? deliveryFrais : 0} €</h2>
                <h2>Status: {statutOrderItems} </h2>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th> Détails commandes</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affichage de chaque aliment dans une ligne distincte */}
                        {orderItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.nom}</td>
                                <td>{item.prix} €</td>
                            </tr>
                        ))}
                        {/* Ligne pour le total de la commande */}
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center", }}>Total: {totalPrice.toFixed(2)} €</td>
                        </tr>
                        {/* Ligne pour valider la livraison */}
                        <tr>
                            <td colSpan="2">
                                <Button variant="primary" onClick={() => handleConfirmDelivery()}>Confirmer livraison</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );

};

export default Delivery;
