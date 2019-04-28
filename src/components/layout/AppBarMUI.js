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
    appBarShift: {
        marginLeft: theme.drawerWidth,
        width: `calc(100% - ${theme.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
})


class AppBarMUI extends React.Component {
    state = {
        arrowRef: null,
    }

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
        const {classes, isFetchingContract, handleDrawerOpen, open} = this.props

        if (isFetchingContract) {
            return null
        }

        return (
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, open && classes.appBarShift)}>
                <Toolbar disableGutters={!open} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
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
