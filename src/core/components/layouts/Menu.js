import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import React, {useContext} from "react";
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
                <Link to="/"><Navbar.Brand >IEF Eat</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className="nav-link">Home</Link>
                        <Link to={'/our-products'} className="nav-link">Menu</Link>
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
                        {user && user.roles.length === 2 &&
                            <Link to={`/dishes`} className="nav-link"><FaCog /> Gérer Plats</Link>
                        }
                        {user && user.roles.length === 2 &&
                            <Link to={`/users`} className="nav-link"><FaCog /> Gérer Users</Link>
                        }
                        {user &&
                            <Link to={`/profil/${user?._id}`} className="nav-link"><FaUser /> Profil</Link>
                        }
                        {user ?
                            <div>
                                <Link to={`/order/${user._id}`}>
                                    <Button className="btn btn-secondary"><FaShoppingCart />Commandes  </Button>
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
