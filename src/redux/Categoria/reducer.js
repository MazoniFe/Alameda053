const estadoInicial = {
    categorias: []
}

const categoria = (state = estadoInicial, action) => {
    if(action.type === 'categoria/atualizar') {
        return {...state, categorias: action.categorias}
    }
    return state;
};

export default categoria;