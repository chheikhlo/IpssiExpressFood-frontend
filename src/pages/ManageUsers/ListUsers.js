import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get(`/users`)
            .then(response => {
                setUsers(response.data);
                console.log(users);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du panier :', error);
            });
    }, []);

    return (
        <div className="listuse-container">
            <div className="container mt-5">
                <h1>Liste des clients et livreurs</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Profil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.roles}</td>
                                <td>
                                    <Link to={`/delete/user/${user._id}`}>
                                        <Button variant="danger" type="submit">
                                            Supprimer
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/profil/${user._id}`}>
                                        <Button variant="primary" type="submit">
                                            Modifier
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListUsers;


