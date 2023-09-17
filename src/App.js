import './App.css';
import Header from './Componentes/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Produtos from './Componentes/ProdutosPagina';
import Compras from './Componentes/ComprasPagina';
import Comandas from './Componentes/ComandasPagina';
import Relatorio from './Componentes/RelatorioPagina';
import Inicio from './Componentes/Inicio';
import JanelaCriarProduto from './Componentes/JanelaCriarProduto';
import ContainerResponsivo from './Componentes/ContainerResponsivo';

function App() {
  const { paginaAtual } = useSelector(rootReducer => rootReducer.paginaReducer);
  const { mostrarCriarProduto } = useSelector(rootReducer => rootReducer.janelaCriarProdutoReducer);

  const renderPage = () => {
    switch (paginaAtual) {
      case 'produtos':
        return (
          <ContainerResponsivo>
            <Produtos />
          </ContainerResponsivo>
        );
      case 'compras':
        return (
          <ContainerResponsivo>
            <Compras />
          </ContainerResponsivo>
        );
      case 'comandas':
        return (
          <ContainerResponsivo>
            <Comandas />
          </ContainerResponsivo>
        );
      case 'relatorio':
        return (
          <ContainerResponsivo>
            <Relatorio />
          </ContainerResponsivo>
        );
      default:
        return (
          <ContainerResponsivo>
            <Inicio />
          </ContainerResponsivo>
        );
    }
  };

  return (
    <div>
      <Header currentPage={paginaAtual} />
      {mostrarCriarProduto && <JanelaCriarProduto />}
      {renderPage()}
    </div>
  );
}

export default App;