import {combineReducers} from 'redux-immutable'

import contract from './contract'
import contractModal from './contractModal'

export default combineReducers({
    contract,
    contractModal,
})
