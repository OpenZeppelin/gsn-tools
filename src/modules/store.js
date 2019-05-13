import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import indexReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = composeEnhancers(applyMiddleware(thunk))

export default function configureStore(initialState) {
    return createStore(indexReducer, initialState, middleware)
}
