import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles/index'
import AppBar from '@material-ui/core/AppBar/index'
import Toolbar from '@material-ui/core/Toolbar/index'
import Typography from '@material-ui/core/Typography/index'
import IconButton from '@material-ui/core/IconButton/index'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const drawerWidth = 240
const styles = theme => ({
    toolbar: {
        paddingRight: 24, // Keep right padding when drawer closed
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
})


class Dashboard extends React.Component {
    render() {
        const {classes, handleDrawerOpen, open} = this.props

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
                        GSN Dapp Tool By Zeppelin
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>
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
}

export default withStyles(styles)(Dashboard)
