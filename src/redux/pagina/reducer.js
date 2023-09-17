const estadoInicial = {
    paginaAtual: 'inicio',
}

const paginaReducer = (state = estadoInicial, action) => {
    if(action.type === 'pagina/navegar') {
        return {...state, paginaAtual: action.payload.novaPagina}
    }

    return state;


};

export default paginaReducer;