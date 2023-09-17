const estadoInicial = {
    categoriaId: null,
    mostrarCriarCategoria: false,
    tipo: 'adicionar'
}

const janelaCriarCategoria = (state = estadoInicial, action) => {
    if(action.type === 'janelaCriarCategoria/mostrar') {
        return {...state, mostrarCriarCategoria: true, tipo: 'adicionar'}
    }
    if(action.type === 'janelaCriarCategoria/naoMostrar') {
        return {...state, mostrarCriarCategoria: false, tipo: 'adicionar'}
    }
    if(action.type === 'janelaCriarCategoria/editar'){
        return { ...state, mostrarCriarCategoria: true, tipo: 'editar', categoriaId: action.categoriaId };
    }
    return state;
};

export default janelaCriarCategoria;