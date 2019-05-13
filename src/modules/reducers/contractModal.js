import * as immutable from 'immutable'

import {ContractModalActions} from '../actions/contractModal'

export default (state = null, action) => {
    switch (action.type) {
        case ContractModalActions.SHOW_MODAL_UPDATE_CONTRACT:
            state = immutable.Map({
                show: true,
            })
            break
        case ContractModalActions.HIDE_MODAL_UPDATE_CONTRACT:
            state = immutable.Map({
                show: false,
            })
            break
        default:
            break
    }
    return state
}
