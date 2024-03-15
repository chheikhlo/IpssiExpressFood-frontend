import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { UserContext } from '../../core/context/AuthContext';

const DeleteFood = () => {
    const [ user ] = useContext(UserContext);
    const { id } = useParams();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);

    };

    const handleDelete = async () => {
        try {
            await api.delete(`/foods/admin/delete/food/${id}`);
            window.location.href = '/dishes';
            handleClose();
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            {user ?
                (user.roles = "Admin" ?
                    <Modal.Body>
                        Êtes-vous sûr de vouloir Supprimer ce plat ?
                    </Modal.Body> :
                    <></>)
                :
                <></>
            }

            <Modal.Footer>
                {user ?
                    (!user.roles.length !== 2 ?
                        <Link to={`/dishes`}>
                            <Button variant="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                        </Link> :
                        <></>) :
                    <></>
                }
                {user ?
                    (!user.roles.length !== 2 ?
                        <Button variant="danger" onClick={handleDelete}>
                            Supprimer
                        </Button> :
                        <></>)
                    :
                    <></>
                }
            </Modal.Footer>


        </Modal>
    );
};

export default DeleteFood;
