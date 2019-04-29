import React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import * as immutable from 'immutable'
import {connect} from 'react-redux'

import {withStyles, withTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Avatar from '@material-ui/core/Avatar'

import {receiveContract} from '../../modules/actions/contract'

const styles = theme => ({
    toolbar: {
        paddingRight: theme.spacing.unit * 3,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
        fontWeight: 300,
        fontSize: `${1.75}em`,
    },
})


class AppBarMUI extends React.Component {
    handleLeaveApp = () => {
        const {dispatch} = this.props
        dispatch(receiveContract(immutable.Map({
            contract: immutable.Map({
                isFetching: false,
                data: immutable.Map({
                    address: null
                })
            })
        })))
    }

    render() {
        const {classes, isFetchingContract, open} = this.props

        if (isFetchingContract) {
            return null
        }

        return (
            <AppBar
                position="absolute"
                className={classNames(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h4"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}>
                        GSN DApp Management Tool By Zeppelin
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleLeaveApp}>
                            <Avatar className={classes.avatar}>
                                <ExitToApp/>
                            </Avatar>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

AppBarMUI.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerOpen: PropTypes.func,
    open: PropTypes.bool,
    contract: PropTypes.instanceOf(immutable.Map).isRequired,
    isFetchingContract: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const contract = state.get('contract') || immutable.Map({isFetching: true, data: immutable.Map()})
    return {
        contract: contract.get('data'),
        isFetchingContract: contract.get('isFetching')
    }
}

export default withTheme()(withStyles(styles)(connect(mapStateToProps)(AppBarMUI)))
