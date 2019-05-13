const ContractActions = {
    REQUEST_CONTRACT: 'API_CONTRACT_REQUEST',
    RECEIVE_CONTRACT: 'API_CONTRACT_RECEIVE',
}

const requestContract = () => ({
    type: ContractActions.REQUEST_CONTRACT,
})

const receiveContract = (contract) => ({
    type: ContractActions.RECEIVE_CONTRACT,
    contract
})

export {
    ContractActions,
    receiveContract,
    requestContract,
}
