import React, {Fragment} from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import * as immutable from 'immutable'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

import {arrowGenerator} from '../../utils/components'
import {receiveContract} from '../../modules/actions/contract'

const drawerWidth = 240

const styles = theme => ({
    toolbar: {
        paddingRight: 24,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
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
    avatar: {
        color: '#fff',
    },
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
        position: 'absolute',
        fontSize: 6,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    bootstrapPopper: arrowGenerator(theme.palette.action.active),
    bootstrapTooltip: {
        backgroundColor: theme.palette.action.active,
    },
    bootstrapPlacementLeft: {
        margin: '0 8px',
    },
    htmlPopper: arrowGenerator('#dadde9'),
    htmlTooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        '& b': {
            fontWeight: theme.typography.fontWeightMedium,
        },
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

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        })
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
                        <Tooltip
                            title={
                                <Fragment>
                                    Leave App
                                    <span className={classes.arrow} ref={this.handleArrowRef}/>
                                </Fragment>
                            }
                            disableFocusListener={true}
                            TransitionProps={{timeout: 600}}
                            placement='left'
                            classes={{
                                tooltip: classes.bootstrapTooltip,
                                popper: classes.bootstrapPopper,
                                tooltipPlacementLeft: classes.bootstrapPlacementLeft,
                            }}
                            PopperProps={{
                                popperOptions: {
                                    modifiers: {
                                        arrow: {
                                            enabled: Boolean(this.state.arrowRef),
                                            element: this.state.arrowRef,
                                        },
                                    },
                                },
                            }}>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleLeaveApp}>
                                <Avatar className={classes.avatar}>
                                    <ExitToApp/>
                                </Avatar>
                            </IconButton>
                        </Tooltip>
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

export default withStyles(styles)(connect(mapStateToProps)(AppBarMUI))
