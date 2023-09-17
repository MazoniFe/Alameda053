const estadoInicial = {
    mostrarCriarCategoria: false,
}

const janelaCriarCategoria = (state = estadoInicial, action) => {
    if(action.type === 'janelaCriarCategoria/mostrar') {
        return {...state, mostrarCriarCategoria: true, tipo: 'adicionar'}
    }
    if(action.type === 'janelaCriarCategoria/naoMostrar') {
        return {...state, mostrarCriarCategoria: false, tipo: 'adicionar'}
    }
    return state;
};

export default janelaCriarCategoria;