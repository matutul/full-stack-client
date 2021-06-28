import React from 'react';
import {
    Link, useHistory
} from "react-router-dom";
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Header.css';
import logo from '../../Images/logo.svg';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleSignOut = () => {
        setLoggedInUser({});
    }
    const history = useHistory();
    const handleLogIn = () => {
        history.push('./login')
    }

    const routeToPath = (path) => {
        history.push(path);
    }

    return (
        <header>
            <div className="upper-header">
                <Container>
                    <h1>Cake Valley</h1>
                    <p>Buy delicious cake online</p>
                </Container>
            </div>
            <Navbar className="nav justify-content-between" variant="dark" sticky="top" collapseOnSelect expand="lg" >
                <Container>
                    <Navbar.Brand><Link to="/home" className="brand-name"><img src={logo} alt="" style={{ width: "200px" }} /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={() => routeToPath("/home")} className="link">Home</Nav.Link>
                            <Nav.Link onClick={() => routeToPath("/orders")} className="link">Orders</Nav.Link>
                            <Nav.Link onClick={() => routeToPath("/admin")} className="link">Admin</Nav.Link>
                            <Nav.Link onClick={() => routeToPath("/contact")} className="link">Contact</Nav.Link>

                            {
                                loggedInUser.displayName ? (<NavDropdown title={loggedInUser.displayName} id="collasible-nav-dropdown" className="link">
                                    <NavDropdown.Item to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleSignOut}>Log out</NavDropdown.Item>
                                </NavDropdown>) : <Button onClick={handleLogIn} className="menu-btn" variant="light">Log in</Button>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;