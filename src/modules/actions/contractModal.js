const ContractModalActions = {
    SHOW_MODAL_UPDATE_CONTRACT: 'UPDATE_CONTRACT_SHOW_MODAL',
    HIDE_MODAL_UPDATE_CONTRACT: 'UPDATE_CONTRACT_HIDE_MODAL',
}

const showModalUpdateContract = () => ({
    type: ContractModalActions.SHOW_MODAL_UPDATE_CONTRACT,
})

const hideModalUpdateContract = () => ({
    type: ContractModalActions.HIDE_MODAL_UPDATE_CONTRACT,
})

export {
    ContractModalActions,
    showModalUpdateContract,
    hideModalUpdateContract,
}
