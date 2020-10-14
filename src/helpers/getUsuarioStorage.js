

export const getUsuarioStorage = () => {
    return {
        agente: localStorage.getItem('agente'),
        escritorio: localStorage.getItem('escritorio'),
    }
}