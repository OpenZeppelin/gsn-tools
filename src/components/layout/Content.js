import React from 'react'
import {Route, Switch} from 'react-router'

import {routes} from '../../utils/routes'
import Clients from '../clients/Clients'
import Transactions from '../transactions/Transactions'
import Dashboard from '../dashboard/Dashboard'
import Blank from '../Blank'


const Content = () => (
    <Switch>
        <Route exact path={routes.clients} component={Clients}/>
        <Route exact path={routes.transactions} render={() => <Transactions/>}/>
        <Route exact path={routes.index} component={Blank}/>
        <Route render={() => <Dashboard/>}/>
    </Switch>
)

export default Content