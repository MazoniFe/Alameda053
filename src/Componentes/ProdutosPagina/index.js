import React, { useCallback, useEffect, useState } from 'react';
import { buscarProdutos, removerProduto, buscarCategorias } from '../../API';
import { Card, Container, Row, Col, ListGroup, InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import JanelaCriarProdutoActionType from '../../redux/JanelaCriarProduto/action-types';
import ProdutosActionTypes from '../../redux/Produto/action-types';

const ProdutosPagina = () => {
    const [categorias, setCategorias] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const {produtos} = useSelector(rootReducer => rootReducer.produtosReducer);

    const dispatch = useDispatch();

    const handleBuscarProdutos = useCallback(() => {
        buscarProdutos(searchTerm) // Passe searchTerm para buscar produtos com base no termo
            .then((data) => {
                dispatch({type: ProdutosActionTypes.ATUALIZAR, produtos: data})
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
                setCategorias(data);
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
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            ) : (
                <Container>
                    <div className="mt-4 mb-4" style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ marginRight: 10 }}>Lista de Produtos</h3>
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
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '800px', justifyContent: 'flex-start' }}>
                            {categorias.map((categoria, index) => (
                                <button
                                    key={index}
                                    onClick={() => selecionarCategoria(categoria.nome)}
                                    style={{
                                        margin: '4px',
                                        backgroundColor: categoriaFiltro === categoria.nome ? '#f0ad4e' : 'transparent',
                                        color: categoriaFiltro === categoria.nome ? '#fff' : '#f0ad4e',
                                        border: `2px solid ${categoriaFiltro === categoria.nome ? '#f0ad4e' : '#ccc'}`,
                                        borderRadius: '4px',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {categoria.nome}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Button variant="success" onClick={handleAdicionarProduto}>Add Produto</Button>
                        </div>
                    </div>

                    <Row>
                        {produtosFiltrados.map((produto, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-5'>
                                <Card style={{ maxWidth: '260px' }} className="mx-auto">
                                    <Card.Img variant="top" style={{ maxHeight: '150px', aspectRatio: '1/1' }} src={produto.img_link} />
                                    <Card.Body>
                                        <Card.Title className='text-truncate'>{produto.nome}</Card.Title>
                                        <Card.Text className='text-truncate'>{produto.descricao}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Preço: {produto.preco}</ListGroup.Item>
                                    </ListGroup>
                                    <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button variant="warning" size="sm" style={{ flex: '1' }} onClick={() => handleEditarProduto(produto.id)}>Editar</Button>
                                        <div style={{ width: '10px' }}></div>
                                        <Button variant="danger" style={{ flex: '1' }} onClick={() => handleRemoveButton(produto.id)}>Remover</Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </Container>
    )
      

}




export default ProdutosPagina;