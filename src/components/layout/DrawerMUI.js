import React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import {withStyles, withTheme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import DrawerItems from './DrawerItems'

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
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
                onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}
                classes={{paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)}}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
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