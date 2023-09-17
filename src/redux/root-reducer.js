import paginaReducer from './pagina/reducer.js';
import janelaCriarProdutoReducer from './JanelaCriarProduto/reducer.js';
import categoriasReducer from './Categoria/reducer.js';
import produtosReducer from './Produto/reducer.js';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    paginaReducer,
    janelaCriarProdutoReducer,
    categoriasReducer,
    produtosReducer
});


export default rootReducer;