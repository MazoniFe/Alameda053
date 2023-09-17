const estadoInicial = {
    produtos: []
}

const produtos = (state = estadoInicial, action) => {
    if(action.type === 'produtos/atualizar') {
        return {...state, produtos: action.produtos}
    }
    return state;
};

export default produtos;