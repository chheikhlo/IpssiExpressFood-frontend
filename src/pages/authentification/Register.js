import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Register = () => {
    const [formData, setFormData] = useState({});
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.telephone.length !== 9) {
            alert("Le numéro de téléphone doit contenir 9 chiffres.");
            return;
        }

        const hashedPassword = bcrypt.hashSync(formData.mot_de_passe, 10);

        setFormData({
            ...formData,
            mot_de_passe: hashedPassword,
        });

        axios.post('http://10.0.50.27:9000/user/register', formData)
            .then(resp => {
                if (resp.status === 200) {
                    alert("Inscription réussie!");
                    setRedirectToLogin(true);
                } else {
                    alert("Erreur lors de l'inscription.");
                }
            })
            .catch(err => {
                console.error("Erreur lors de l'inscription :", err);
                alert("Une erreur s'est produite lors de l'inscription.");
            });
    };

    if (redirectToLogin) {
        window.location.href = '/Signin';
        return null;
    }

    return (
        <div className="login-container">
            <div className="register-container">
                <h2>Formulaire d'Enregistrement</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="nom">Nom :</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom :</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Téléphone :</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mot_de_passe">Mot de passe :</label>
                        <input
                            type="password"
                            id="mot_de_passe"
                            name="mot_de_passe"
                            value={formData.mot_de_passe || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register
