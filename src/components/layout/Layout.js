import React from 'react'
import {Route, Switch} from 'react-router'
import PropTypes from 'prop-types'
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
        open: false,
        dAppContract: '0x46b03Afe43786147D78DABaA734864dE459DFb93',
        openContractModal: false,
    }

    handleDrawerOpen = () => {
        this.setState({open: true})
    }

    handleDrawerClose = () => {
        this.setState({open: false})
    }

    updateModalContract = () => {
        this.setState((prevState) => ({
            openContractModal: !prevState.openContractModal
        }))
    }

    updateDAppContract = (contract) => {
        this.setState({dAppContract: contract}, () => {
            this.updateModalContract()
        })
    }

    render() {
        const {classes} = this.props
        const {open, dAppContract, openContractModal} = this.state

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBarMUI
                    open={open}
                    dAppContract={dAppContract}
                    openModalContractUpdate={this.updateModalContract}
                    handleDrawerOpen={this.handleDrawerOpen}/>
                <DrawerMUI open={open} handleDrawerClose={this.handleDrawerClose}/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Switch>
                        <Route exact path={routes.dashboard} render={() =>
                            <Dashboard
                                dAppContract={dAppContract}
                                openModalContractUpdate={this.updateModalContract}/>
                        }/>
                        <Route exact path={routes.clients} component={Clients}/>
                        <Route exact path={routes.transactions} render={() =>
                            <Transactions dAppContract={dAppContract}/>
                        }/>
                        <Route component={Blank}/>
                    </Switch>
                    <UpdateDAppContractModal
                        openModalContractUpdate={this.updateModalContract}
                        updateDAppContract={this.updateDAppContract}
                        shouldOpen={openContractModal}/>
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
