import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="centered-content">
                <h1>Bienvenue sur IEF Eat</h1><br></br>
                <h6>Découvrez le Menu du jour</h6>
                <Link to="/menu" className="btn btn-primary">
                    Menu
                </Link>
            </div>
        </div>
    );
}

export default Home;
