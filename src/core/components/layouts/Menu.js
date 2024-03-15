import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import React, { useContext } from "react";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Menu = () => {
    const [user, setUser] = useContext(UserContext);

    console.log(user);
    const logout = () => {
        setUser(undefined);
        sessionStorage.removeItem('USER');
    }

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/" style={{textDecoration: 'none'}}><Navbar.Brand >IEF Eat</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className="nav-link">Accueil</Link>
                        <Link to={'/menu'} className="nav-link">Menu</Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {user ?
                            <></> :
                            <Link to="/signup" className="nav-link"><FaUser /> S'inscrire</Link>
                        }
                        {user ?
                            <Link to={'/'} onClick={logout} className="nav-link"><FaSignOutAlt /> Se Deconnecter</Link> :
                            <Link to={'/signin'} className="nav-link"><FaUser /> Se connecter</Link>
                        }
                        &nbsp;&nbsp;&nbsp;
                        {user && user.roles === "Admin" &&
                            <Link to={`/dishes`} className="nav-link"><FaCog /> Gérer Plats</Link>
                        }
                        {user && user.roles === "Admin" &&
                            <Link to={`/users`} className="nav-link"><FaCog /> Gérer Users</Link>
                        }
                        {user && user.roles === "Livreur" &&
                            <Link to={`/delivery/${user._id}`} className="nav-link"><FaCog /> A Livrer</Link>
                        }
                        {user &&
                            <Link to={`/profil/${user?._id}`} className="nav-link"><FaUser /> Profil</Link>
                        }
                        {user && user.roles === "Client" ?
                            <div>
                                <Link to={`/order/${user._id}`}>
                                    <Button className="btn btn-secondary"><FaShoppingCart />Panier  </Button>
                                </Link>
                            </div> :
                            <></>
                        }
                        &nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
