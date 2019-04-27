import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import * as immutable from 'immutable'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import configureStore from './modules/store'
import App from './components/App'

const reduxStore = configureStore(immutable.Map())

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