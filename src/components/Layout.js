import React from 'react'
import {Route, Switch} from 'react-router'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index'
import CssBaseline from '@material-ui/core/CssBaseline/index'

import DrawerMUI from './DrawerMUI'
import AppBarMUI from './AppBarMUI'
import {routes} from '../utils/routes'
import Blank from './Blank'
import Clients from './Clients'
import Transactions from './Transactions'
import Dashboard from './Dashboard'

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
    }

    handleDrawerOpen = () => {
        this.setState({open: true})
    }

    handleDrawerClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        const {open} = this.state

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBarMUI open={open} handleDrawerOpen={this.handleDrawerOpen}/>
                <DrawerMUI open={open} handleDrawerClose={this.handleDrawerClose}/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Switch>
                        <Route exact path={routes.dashboard} component={Dashboard}/>
                        <Route exact path={routes.clients} component={Clients}/>
                        <Route exact path={routes.transactions} component={Transactions}/>
                        <Route component={Blank}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
