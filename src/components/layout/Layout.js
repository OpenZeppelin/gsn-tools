import React from 'react'
import {Route, Switch} from 'react-router'
import * as PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import DrawerMUI from './DrawerMUI'
import AppBarMUI from './AppBarMUI'
import {routes} from '../../utils/routes'
import Blank from '../Blank'
import Clients from '../clients/Clients'
import Transactions from '../transactions/Transactions'
import Dashboard from '../dashboard/Dashboard'
import UpdateDAppContractModal from '../dashboard/UpdateDAppContractModal'

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
})


class Layout extends React.Component {
    state = {
        openDrawer: false,
    }

    handleDrawerOpen = () => {
        this.setState({openDrawer: true})
    }

    handleDrawerClose = () => {
        this.setState({openDrawer: false})
    }

    render() {
        const {classes} = this.props
        const {openDrawer} = this.state

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBarMUI
                    open={openDrawer}
                    handleDrawerOpen={this.handleDrawerOpen}/>
                <DrawerMUI open={openDrawer} handleDrawerClose={this.handleDrawerClose}/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Switch>
                        <Route exact path={routes.dashboard} render={() =>
                            <Dashboard/>
                        }/>
                        <Route exact path={routes.clients} component={Clients}/>
                        <Route exact path={routes.transactions} render={() =>
                            <Transactions/>
                        }/>
                        <Route component={Blank}/>
                    </Switch>
                    <UpdateDAppContractModal/>
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
