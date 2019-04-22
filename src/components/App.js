import React from 'react'
import {Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import Root from './Root'
import {routes} from '../utils/routes'


class App extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <Route path={routes.index} component={Root}/>
            </BrowserRouter>
        )
    }
}

export default App
