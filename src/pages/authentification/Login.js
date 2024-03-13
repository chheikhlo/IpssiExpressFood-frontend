import React, { useState, useContext } from 'react';
import api, { setAuthToken } from "../../services/api";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../core/context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [ user, setUser ] = useContext(UserContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        api.post('/user/login', formData)
            .then(resp => {
                if (resp.status === 200) {
                    setUser(resp.data);
                    console.log(user);
                    sessionStorage.setItem('USER', JSON.stringify(resp.data));
                    setAuthToken(resp.data.token);
                    navigate('/menu');
                } else {
                    setError('Identifiants incorrects. Veuillez réessayer.');
                }
            }).catch(er => {
                console.error("Erreur lors de l'authentification:", er);
                setError("Erreur lors de l'authentification");
            });
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Connexion</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="label">
                            Email (login):
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mot_de_passe" className="label">
                            Mot de passe:
                        </label>
                        <input
                            type="password"
                            id="mot_de_passe"
                            name="mot_de_passe"
                            value={formData.mot_de_passe}
                            onChange={handleInputChange}
                            required
                            className="input"
                        />
                    </div>
                    <button type="submit" className="button">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
