const estadoInicial = {
    mostrarJanelaCategorias: false
}

const janelaCategoriasReducer = (state = estadoInicial, action) => {
    if(action.type === 'janelaCategorias/mostrar') {
        return {...state, mostrarJanelaCategorias: true}
    }
    if(action.type === 'janelaCategorias/naoMostrar') {
        return {...state, mostrarJanelaCategorias: false}
    }
    return state;
};

export default janelaCategoriasReducer;