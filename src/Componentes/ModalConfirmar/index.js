import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removerCategoria, buscarCategorias, removerProduto, buscarProdutos } from '../../API';
import ModalConfirmarActionTypes from '../../redux/ModalConfirmar/action-types';
import ProdutosActionTypes from '../../redux/Produto/action-types';
import CategoriasActionType from '../../redux/Categoria/action-types';
import { useState, useCallback, useEffect } from 'react';

const ModalConfirmar = () => {

  const dispatch = useDispatch();
  const { mostrarModalConfirmar, tipo, nome, id } = useSelector(rootReducer => rootReducer.modalConfirmarReducer);
  const [loading, setLoading] = useState(true);

  const handleFecharModal = () => {
    dispatch({ type: ModalConfirmarActionTypes.ESCONDER });
  }

  const handleRemoverCategoria = () => {
    removerCategoria(id)
      .then(() => {
        handleFecharModal();
        handleBuscarCategorias();
      })
      .catch(e => {
      }).finally(e => {
        setLoading(false);
      });
  }

  const handleRemoverProduto = () => {
    removerProduto(id)
      .then(() => {
        handleFecharModal();
        handleBuscarProdutos();
      })
      .catch(e => {
      }).finally(e => {
        setLoading(false);
      });
  }

  const handleBuscarCategorias = useCallback(() => {
    buscarCategorias() // Passe searchTerm para buscar produtos com base no termo
      .then((data) => {
        dispatch({ type: CategoriasActionType.ATUALIZAR, categorias: data })
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(e => {
        setLoading(false);

      });
  }, [dispatch]);

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

  useEffect(() => {
    handleBuscarCategorias();
  }, [handleBuscarCategorias]);

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
    tipo === 'categoria' ? (
      <Modal show={mostrarModalConfirmar} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão de Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que quer excluir <span style={{ fontWeight: 500, color: '#FD7F3F' }}>{nome}</span> de sua lista de categorias?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleRemoverCategoria}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    ) : (
      <Modal show={mostrarModalConfirmar} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão de Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que quer excluir <span style={{ fontWeight: 500, color: '#FD7F3F' }}>{nome}</span> de sua lista de produtos?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleRemoverProduto}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default ModalConfirmar;