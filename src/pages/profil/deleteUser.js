import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { UserContext } from "../../core/context/AuthContext";



const DeleteProfil = () => {
    const [user] = useContext(UserContext);
    const { id } = useParams();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/delete/user/${id}`);
            window.location.href = '/users';
            handleClose();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };
    console.log(user);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            {user ?
                (user.roles === "Admin" ?
                    <Modal.Body>
                        Êtes-vous sûr de vouloir Supprimer ce user ?
                    </Modal.Body> :
                    <Modal.Body>
                        Êtes-vous sûr de vouloir vous desinscrire ?
                    </Modal.Body>)
                :
                <></>
            }

            <Modal.Footer>
                {user ?
                    (user.roles.length !== 2 ?
                        <Link to={`/profil/${user._id}`}>
                            <Button variant="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                        </Link> :
                        <Link to={`/users`}>
                            <Button variant="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                        </Link>) :
                    <></>
                }
                {user ?
                    (user.roles.length !== 2 ?
                        <Button variant="danger" onClick={handleDelete}>
                            Supprimer
                        </Button> :
                        <Button variant="danger" onClick={handleDelete}>
                            Se Désinscrire
                        </Button>)
                    :
                    <></>
                }
            </Modal.Footer>


        </Modal>
    );
};

export default DeleteProfil;
