import {getContractDetails} from '../../apis/etherscan'

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

const fetchContract = () => (dispatch) => {
    dispatch(requestContract())
    return getContractDetails().then(contract => dispatch(receiveContract(contract)))
}

const shouldFetchContract = (state) => {
    const contract = state.get('contract')
    return !contract || !contract.get('isFetching')
}

const fetchContractIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchContract(getState())) {
        return dispatch(fetchContract())
    }
}

export {
    ContractActions,
    fetchContractIfNeeded,
}
