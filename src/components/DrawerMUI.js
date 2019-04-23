import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles/index'
import Drawer from '@material-ui/core/Drawer/index'
import List from '@material-ui/core/List/index'
import Divider from '@material-ui/core/Divider/index'
import IconButton from '@material-ui/core/IconButton/index'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import {DrawerItems} from './DrawerItems'

const drawerWidth = 240

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
        width: drawerWidth,
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
    render() {
        const {classes, handleDrawerClose, open} = this.props

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{DrawerItems}</List>
            </Drawer>
        )
    }
}

DrawerMUI.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func,
    open: PropTypes.bool,
}

export default withStyles(styles)(DrawerMUI)
