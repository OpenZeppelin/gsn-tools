import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

import {arrowGenerator} from '../../utils/components'

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


class Dashboard extends React.Component {
    state = {
        arrowRef: null,
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        })
    }

    render() {
        const {classes, handleDrawerOpen, open, dAppContract, openModalContractUpdate} = this.props

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
                        GSN Dapp Management Tool By Zeppelin
                    </Typography>
                    <div>
                        <Tooltip
                            title={
                                <Fragment>
                                    <center>
                                        Update<br/>DApp Contract
                                    </center>
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
                                onClick={openModalContractUpdate}>
                                <Avatar className={classes.avatar}>
                                    {dAppContract && <Lock/>}
                                    {!dAppContract && <LockOpen/>}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerOpen: PropTypes.func,
    open: PropTypes.bool,
    dAppContract: PropTypes.string,
    openModalContractUpdate: PropTypes.func.isRequired,
}

export default withStyles(styles)(Dashboard)
