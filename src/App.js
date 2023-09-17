import './App.css';
import Header from './Componentes/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Produtos from './Componentes/ProdutosPagina';
import JanelaCriarProduto from './Componentes/JanelaCriarProduto';
import JanelaCriarCategoria from './Componentes/JanelaCriarCategoria';
import Inicio from './Componentes/Inicio';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';



function App() {
  const { mostrarCriarProduto } = useSelector(rootReducer => rootReducer.janelaCriarProdutoReducer);
  const { mostrarCriarCategoria } = useSelector(rootReducer => rootReducer.janelaCriarCategoriasReducer);
  return (

    <Router>
      {mostrarCriarProduto && (
        <JanelaCriarProduto></JanelaCriarProduto>
      )}
      {mostrarCriarCategoria && (
        <JanelaCriarCategoria></JanelaCriarCategoria>
      )}
      <Header></Header>
      <Container>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;