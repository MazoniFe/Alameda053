import React, { useCallback, useEffect, useState } from 'react';
import { buscarProdutos, removerProduto, buscarCategorias } from '../../API';
import { Card, Container, Row, Col, ListGroup, InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { BsPlusCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {FiDelete} from 'react-icons/fi';
import JanelaCriarProdutoActionType from '../../redux/JanelaCriarProduto/action-types';
import JanelaCriarCategoriaActionType from '../../redux/JanelaCriarCategoria/action-types';
import ProdutosActionTypes from '../../redux/Produto/action-types';
import CategoriasActionTypes from '../../redux/Categoria/action-types';
import './produtosPagina.css';

const ProdutosPagina = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const { produtos } = useSelector(rootReducer => rootReducer.produtosReducer);
    const {categorias} = useSelector(rootReducer => rootReducer.categoriasReducer)

    const dispatch = useDispatch();

    const handleBuscarProdutos = useCallback(() => {
        buscarProdutos(searchTerm) // Passe searchTerm para buscar produtos com base no termo
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
    }, [searchTerm, dispatch]);

    const handleBuscarCategorias = useCallback(() => {
        buscarCategorias()
            .then((data) => {
                dispatch({type: CategoriasActionTypes.ATUALIZAR, categorias: data});
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(e => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        handleBuscarProdutos();
        handleBuscarCategorias();
    }, [handleBuscarCategorias, handleBuscarProdutos]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    const selecionarCategoria = (e) => {
        if (categoriaFiltro === e) {
            setCategoriaFiltro('');
        }
        else {
            setCategoriaFiltro(e);
        }
    }

    const handleRemoveButton = (id) => {
        removerProduto(id)
            .then(data => {
                handleBuscarProdutos();
            }).catch(e => {

            }).finally(e => {

            })
    }

    const handleAdicionarProduto = (type) => {
        dispatch({ type: JanelaCriarProdutoActionType.MOSTRAR });
    }

    const handleAdicionarCategoria = (type) => {
        dispatch({ type: JanelaCriarCategoriaActionType.MOSTRAR });
    }

    const handleEditarProduto = (id) => {
        dispatch({ type: JanelaCriarProdutoActionType.EDITAR, produtoId: id });
    }

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        produto.categoria.toLowerCase().includes(categoriaFiltro.toLowerCase())
    );
    return (
        <Container>
            {loading ? (
                <div className="loading-content"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,  -50%)',
                        textAlign: 'center',
                    }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            ) : (
                <Container>
                    <Row className="mt-4 mb-4">
                        <Col xs={12} md={3}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h4>Produtos</h4>
                                <BsPlusCircleFill size={22} style={{ marginRight: '0.6em', color: 'rgb(60, 179, 113)' }} onClick={handleAdicionarProduto}></BsPlusCircleFill>
                            </div>
                            <div style={{ maxWidth: 280 }}>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1"><BsSearch></BsSearch></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Pesquisar produto..."
                                        aria-label="Pesquisar produto"
                                        aria-describedby="basic-addon1"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </InputGroup>
                            </div>

                            <div className='d-flex align-items-center justify-content-between mt-5'>
                                <h5>Categorias</h5>
                                <BsPlusCircleFill size={22} style={{ marginRight: '0.6em', color: 'rgb(255, 165, 0)' }} onClick={handleAdicionarCategoria}></BsPlusCircleFill>
                            </div>
                            <form className='categoriaForm mt-3' style={{display: 'flex', flexDirection: 'column' }}>
                                {categorias.map((categoria) => (
                                    <div className='d-flex align-items-center justify-content-between'>
                                    <Form.Check
                                        key={categoria.id}
                                        className='form-check'
                                        inline
                                        label={categoria.nome}
                                        name="group1"
                                        type={'checkbox'}
                                        id={`inline-checkbox-${categoria.id}`}
                                        checked={categoriaFiltro === categoria.nome}
                                        onChange={() => selecionarCategoria(categoria.nome)}
                                        style={{
                                            fontSize: '1em', // Aumenta o tamanho da fonte
                                            marginTop: '5px', // Aumenta o espaço ao redor do checkbox
                                        }}
                                    />
                                    <FiDelete style={{color:'rgb(232, 55, 55)', marginRight:'0.6em'}}> </FiDelete>
                                    </div>

                                ))}
                            </form>

                        </Col>
                        <Col xs={12} md={9}>
                            <Row>
                                <Col xs={12}>
                                    <div className="custom-scroll">
                                        <Row>
                                            {produtosFiltrados.map((produto, index) => (
                                                <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-3'>
                                                    <Card style={{ maxWidth: '260px' }} className="mx-auto">
                                                        <Card.Img className='cardImg' variant="top" style={{ maxHeight: '150px', aspectRatio: '1/1' }} src={produto.img_link} />
                                                        <Card.Body>
                                                            <Card.Title className='text-sm text-truncate card-title'>{produto.nome}</Card.Title>
                                                            <Card.Text className='text-truncate card-text'>{produto.descricao}</Card.Text>
                                                        </Card.Body>
                                                        <ListGroup className="list-group-flush">
                                                            <ListGroup.Item>Preço: {produto.preco}</ListGroup.Item>
                                                        </ListGroup>
                                                        <div className="container-buttons-card flex-wrap d-flex justify-content-between">
                                                            <Button variant="warning" className="mx-2 my-2 flex-fill btn-sm" onClick={() => handleEditarProduto(produto.id)}>Editar</Button>
                                                            <Button variant="danger" className="mx-2 my-2 flex-fill btn-sm" onClick={() => handleRemoveButton(produto.id)}>Remover</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    )


}




export default ProdutosPagina;