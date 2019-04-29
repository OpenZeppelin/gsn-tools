import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import * as immutable from 'immutable'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import configureStore from './modules/store'
import App from './components/App'

const reduxStore = configureStore(immutable.Map({
    contract: immutable.Map({
        isFetching: false,
        data: immutable.Map({
            address: '0x7607e5a7576674cbc7d03a1465bdef84b457eb0b'
        })
    })
}))

JavascriptTimeAgo.locale(en)

const render = (AppComponent) => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <AppContainer>
                <AppComponent/>
            </AppContainer>
        </Provider>,
        window.document.getElementById('root')
    )
}

render(() => <App/>)