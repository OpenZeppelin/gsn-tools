import React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import {withStyles, withTheme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

import DrawerItems from './DrawerItems'
import AppBarSpacer from './AppBarSpacer'

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: theme.spacing.unit * 24,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
})

class DrawerMUI extends React.Component {
    handleEnter = () => {
        const {handleDrawerOpen, open} = this.props
        if (!open) {
            handleDrawerOpen()
        }
    }

    handleLeave = () => {
        const {handleDrawerClose, open} = this.props
        if (open) {
            handleDrawerClose()
        }
    }

    render() {
        const pathname = window.location.pathname
        const {classes, open} = this.props
        return (
            <Drawer
                open={open}
                variant="permanent"
                onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}
                classes={{paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)}}>
                <AppBarSpacer/>
                <List className={classes.pushDown}>
                    <DrawerItems pathname={pathname}/>
                </List>
            </Drawer>
        )
    }
}

DrawerMUI.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func,
    handleDrawerOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default withTheme()(withStyles(styles)(DrawerMUI))