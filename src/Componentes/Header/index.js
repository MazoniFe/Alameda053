import React, { useState } from 'react';
import logo from './logo.jpg';
import './Header.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const toggleOffCanvas = () => {
        setShowOffCanvas(!showOffCanvas);
    };

    return (
        <div className='header'>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    {/* Logo à esquerda */}
                    <Navbar.Brand href="#">
                        <img
                            src={logo}
                            alt="Logo"
                            height="75"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>

                    {/* Botão do menu hamburguer */}
                    <Button
                        variant="outline-light"
                        onClick={toggleOffCanvas}
                        className="d-lg-none"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </Button>

                    {/* Menu no centro (mostrado em telas grandes) */}
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className={`${showOffCanvas ? '' : 'justify-content-center'
                            } d-lg-flex`}
                    >
                        <Nav className="mx-auto">
                            <Nav.Link href="#" className="nav-link-hover">
                                Início
                            </Nav.Link>
                            <Nav.Link href="produtos" className="nav-link-hover">
                                Produtos
                            </Nav.Link>
                            <Nav.Link href="#" className="nav-link-hover">
                                Categorias
                            </Nav.Link>
                            <Nav.Link href="#" className="nav-link-hover">
                                Compra
                            </Nav.Link>
                            <Nav.Link href="#" className="nav-link-hover">
                                Comandas
                            </Nav.Link>
                            <Nav.Link href="#" className="nav-link-hover">
                                Relatório
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" className="ml-auto nav-link-hover">
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Menu off-canvas (mostrado em telas pequenas) */}
            <div
                className={`off-canvas ${showOffCanvas ? 'show' : ''}`}
            >
                <Nav className="flex-column" style={{ width: '145px' }}>
                    <Nav.Link href="#" className="nav-link-hover">
                        Início
                    </Nav.Link>
                    <Nav.Link href="#" className="nav-link-hover">
                        Produtos
                    </Nav.Link>
                    <Nav.Link href="#" className="nav-link-hover">
                        Categorias
                    </Nav.Link>
                    <Nav.Link href="#" className="nav-link-hover">
                        Compra
                    </Nav.Link>
                    <Nav.Link href="#" className="nav-link-hover">
                        Comandas
                    </Nav.Link>
                    <Nav.Link href="#" className="nav-link-hover">
                        Relatório
                    </Nav.Link>
                    <Nav.Link href="#" className="ml-auto">
                        Login
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Header;
