import React from 'react'
import {Route, Switch} from 'react-router'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as immutable from 'immutable'

import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import DrawerMUI from './DrawerMUI'
import AppBarMUI from './AppBarMUI'
import {routes} from '../../utils/routes'
import Clients from '../clients/Clients'
import Transactions from '../transactions/Transactions'
import Dashboard from '../dashboard/Dashboard'
import UpdateContractModal from '../dashboard/UpdateContractModal'
import Blank from '../Blank'
import Landing from '../Landing'

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
        const {classes, contract} = this.props
        const {openDrawer} = this.state

        if (contract.get('address')) {
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
                        <UpdateContractModal/>
                    </main>
                </div>
            )
        }

        return (
            <Route component={Landing}/>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    contract: PropTypes.instanceOf(immutable.Map).isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const contract = state.get('contract') || immutable.Map({isFetching: true, data: immutable.Map()})
    return {
        contract: contract.get('data'),
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Layout))