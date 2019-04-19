import React from 'react'
import {Route, Switch} from 'react-router'

import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Transactions from './Transactions'
import Clients from './Clients'
import routes from '../utils/routes'
import Blank from './Blank'


class Root extends React.Component {
    render = () => {
        return (
            <React.Fragment>
            <div className="Page-story-container">
                <Navbar/>
                <Switch>
                    <Route exact path={routes.dashboard} component={Dashboard}/>
                    <Route exact path={routes.clients} component={Clients}/>
                    <Route exact path={routes.transactions} component={Transactions}/>
                    <Route component={Blank}/>
                </Switch>
                <Footer/>
            </div>
            </React.Fragment>

        )
    }
}

export default Root
