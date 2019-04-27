import * as immutable from 'immutable'

import {ContractActions} from '../actions/contract'

export default (state = null, action) => {
    switch (action.type) {
        case ContractActions.REQUEST_CONTRACT:
            state = immutable.Map({
                isFetching: true,
                data: immutable.Map()})
            break
        case ContractActions.RECEIVE_CONTRACT:
            state = immutable.Map({
                isFetching: false,
                data: action.contract
            })
            break
        default:
            break
    }
    return state
}
