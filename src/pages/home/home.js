import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="centered-content">
                <h1>Bienvenue sur IEF Eat</h1><br></br>
                <h6>Découvrez les Plats du jour</h6>
                <Link to="/menu" className="btn btn-primary">
                    Plats du Jour
                </Link>
            </div>
        </div>
    );
}

export default Home;
