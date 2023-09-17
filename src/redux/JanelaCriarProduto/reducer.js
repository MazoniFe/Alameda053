const estadoInicial = {
    produtoId: null,
    mostrarCriarProduto: false,
    tipo: 'adicionar'
}

const janelaCriarProduto = (state = estadoInicial, action) => {
    if(action.type === 'janelaCriarProduto/mostrar') {
        return {...state, mostrarCriarProduto: true, tipo: 'adicionar'}
    }
    if(action.type === 'janelaCriarProduto/naoMostrar') {
        return {...state, mostrarCriarProduto: false, tipo: 'adicionar'}
    }
    if(action.type === 'janelaCriarProduto/editar'){
        return { ...state, mostrarCriarProduto: true, tipo: 'editar', produtoId: action.produtoId };
    }
    return state;
};

export default janelaCriarProduto;