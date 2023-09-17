import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './Header.css';
import logo from './logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import PaginaActionTypes from '../../redux/pagina/action-types';


function Header() {

    const dispatch = useDispatch();
    const paginaAtual = useSelector(rootReducer => rootReducer.paginaAtual);

    const trocarPagina = (novaPagina) => {
        dispatch({
            type: PaginaActionTypes.NAVEGAR,
            payload: {novaPagina: novaPagina}
        });
    }

    return (
        <Navbar className='header' bg="light" variant="light">
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="Logo da Empresa"
                        width="80"
                        height="80"
                        className="d-inline-block align-top"
                        style={{ padding: 10 }}
                    />
                    {'Alameda 053'}
                </Navbar.Brand>
                <div className="d-flex flex-fil menu-header">
                    <Nav variant="pills" activeKey={paginaAtual}>
                        {/* <Nav.Item>
                            <Nav.Link className="nav-link-custom" eventKey="inicio" onClick={() => trocarPagina('inicio')}>Inicio</Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Nav.Link className="nav-link-custom" eventKey="produtos" onClick={() => trocarPagina('produtos')}>Produtos</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link className="nav-link-custom" eventKey="compras" onClick={() => trocarPagina('compras')}> Compras</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-link-custom" eventKey="comandas" onClick={() => trocarPagina('comandas')}>Comandas</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-link-custom" eventKey="relatorio" onClick={() => trocarPagina('relatorio')}>Relatorio</Nav.Link>
                        </Nav.Item> */}
                    </Nav>
                </div>
                <Button style={{ marginLeft: 135 }} variant="primary">Login</Button>
            </Container>
        </Navbar>
    );
}

export default Header;