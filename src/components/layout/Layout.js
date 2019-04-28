import React from 'react'
import {Route} from 'react-router'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as immutable from 'immutable'

import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import UpdateContractModal from '../dashboard/UpdateContractModal'
import Landing from '../Landing'
import Content from './Content'
import Menu from './Menu'

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
    render() {
        const {classes, contract} = this.props

        if (contract.get('address')) {
            return (
                <div className={classes.root}>
                    <CssBaseline/>
                    <Menu/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <Content/>
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