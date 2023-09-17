import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from 'react-redux';
import JanelaCriarProdutoActionTypes from '../../redux/JanelaCriarProduto/action-types';
import { buscarProdutos, buscarProduto, cadastrarProduto, alterarProduto } from '../../API';
import ProdutosActionTypes from '../../redux/Produto/action-types';

const ModalCriarEditar = () => {
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        preco: '',
        img_link: ''
    });
    const dispatch = useDispatch();
    const { tipo, produtoId } = useSelector(rootReducer => rootReducer.janelaCriarProdutoReducer);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => {
            const updatedProduto = { ...prevProduto, [name]: value };
            return updatedProduto;
        });
    };

    const setImagemCarregada = (url) => {
        setProduto(prevProduto => ({
            ...prevProduto,
            img_link: url
        }));
    }

    const handleEditarProduto = useCallback(() => {
        if (produtoId !== null) {
            buscarProduto(produtoId)
                .then(data => {
                    const novoDado = data;
                    novoDado.categoria = data.categoria.nome;
                    console.log(data);
                    setProduto(novoDado);
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(e => {
                    setLoading(false);
                });
        }
    }, [produtoId]) 

    useEffect(() => {
        if (tipo === 'editar') {
            handleEditarProduto(29);
        } else {
            setProduto({
                nome: 'Nome',
                descricao: 'Descricao',
                categoria: 'OUTROS',
                preco: '1',
                img_link: 'https://www.decorfacil.com/wp-content/uploads/2018/03/20180307cor-amarela-na-parede.jpg'
            });
            setLoading(false);
        }

    }, [tipo, handleEditarProduto]);

    const fecharJanela = () => {
        dispatch({ type: JanelaCriarProdutoActionTypes.ESCONDER });
    }

    const enviarCadastroProduto = () => {
        cadastrarProduto(produto)
            .then(() => {
                fecharJanela();
                handleBuscarProdutos();
            })
            .catch(e => {
                console.log(e);
            }).finally(e => {
                setLoading(false);
            });
    };

    const handleBuscarProdutos = useCallback(() => {
        buscarProdutos() // Passe searchTerm para buscar produtos com base no termo
            .then((data) => {
                dispatch({ type: ProdutosActionTypes.ATUALIZAR, produtos: data })
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

    const enviarAlteracaoProduto = () => {
        alterarProduto({ ...produto, produtoId })
            .then(data => {
                fecharJanela();
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
                <Modal.Title>Cadastro de Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row style={{ flexWrap: 'nowrap' }}>
                        <Col>
                            <Form>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <Form.Group controlId="nome">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nome"
                                                value={produto.nome}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="descricao">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="descricao"
                                                value={produto.descricao}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="categoria">
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="categoria"
                                                value={produto.categoria}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="preco">
                                            <Form.Label>Preço</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="preco"
                                                value={produto.preco}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="link_imagem">
                                            <Form.Label>Link da Imagem</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="img_link"
                                                value={produto.img_link}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                        <Col className="preview">
                            <h4>Preview</h4>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    style={{ maxHeight: '150px', aspectRatio: '1/1' }}
                                    src={produto.img_link}
                                    onLoad={() => setImagemCarregada(produto.img_link)} 
                                    onError={e => { e.target.src = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}
                                    />
                                <Card.Body>
                                    <Card.Title className='text-truncate'>{produto.nome}</Card.Title>
                                    <Card.Text className='text-truncate'>{produto.descricao}</Card.Text>
                                </Card.Body>

                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Preço: {produto.preco}</ListGroup.Item>
                                </ListGroup>

                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <Button variant="warning" size="sm">Editar</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="danger" size="sm">Remover</Button>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={tipo === 'editar' ? enviarAlteracaoProduto : enviarCadastroProduto}>
                    Enviar
                </Button>
                <Button variant="secondary" onClick={fecharJanela}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalCriarEditar;
