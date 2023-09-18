const estadoInicial = {
    id : null,
    tipo: '',
    nome: 'teste',
    mostrarModalConfirmar: false
}

const ModalConfirmarReducer = (state = estadoInicial, action) => {
    if(action.type === 'modalConfirmar/mostrar') {
        return {...state, mostrarModalConfirmar: true, tipo: action.tipo, nome: action.nome, id:action.id}
    }
    if(action.type === 'modalConfirmar/naoMostrar') {
        return {...state, mostrarModalConfirmar: false}
    }
    return state;
};

export default ModalConfirmarReducer;