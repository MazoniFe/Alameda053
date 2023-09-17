import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { useDispatch} from 'react-redux';
import { buscarCategorias, cadastrarCategoria } from '../../API';
import CategoriasActionType from '../../redux/Categoria/action-types';
import janelaCriarCategoriaActionTypes from '../../redux/JanelaCriarCategoria/action-types';

const ModalCriarEditar = () => {
    const [categoria, setCategoria] = useState({
        nome: ''
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prevProduto) => {
            const updatedProduto = { ...prevProduto, [name]: value };
            return updatedProduto;
        });
    };

    const handleBuscarCategorias = useCallback(() => {
        buscarCategorias() // Passe searchTerm para buscar produtos com base no termo
            .then((data) => {
                dispatch({ type: CategoriasActionType.ATUALIZAR, categorias: data })
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(e => {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);

            });
    }, [dispatch]);

    useEffect(() => {
        handleBuscarCategorias();
    },[handleBuscarCategorias]);

    const fecharJanela = () => {
        dispatch({ type: janelaCriarCategoriaActionTypes.ESCONDER });
    }

    const enviarCadastroCategoria = () => {
        cadastrarCategoria(categoria)
            .then(() => {
                fecharJanela();
                handleBuscarCategorias();
            })
            .catch(e => {
                console.log(e);
            }).finally(e => {
                setLoading(false);
            });
    };

    if (loading) return (
        <div className="loading-content"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
            <Spinner animation="border" variant="warning" />
        </div>
    );

    return (
        <Modal show onHide={fecharJanela} animation>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row style={{ flexWrap: 'nowrap' }}>
                        <Col lg={12} md={12} sm={12}>
                            <Form.Group controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={categoria.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={enviarCadastroCategoria}>
                    Enviar
                </Button>
                <Button variant="secondary" onClick={fecharJanela}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalCriarEditar;
