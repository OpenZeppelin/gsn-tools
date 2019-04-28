import React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import DrawerItems from './DrawerItems'

const styles = theme => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
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
            width: theme.spacing.unit * 9,
        },
    },
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
        const {classes, handleDrawerClose, open} = this.props
        return (
            <Drawer
                open={open}
                variant="permanent"
                classes={{paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)}}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
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

export default withStyles(styles)(DrawerMUI)
