import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'

import {buildUrl, routes} from '../../utils/routes'

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
        const pathname = window.location.pathname

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
                <List>
                    <div>
                        <ListItem
                            button
                            selected={pathname === buildUrl(routes.dashboard)}
                            component={props => <Link to={buildUrl(routes.dashboard)} {...props}/>}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem
                            button
                            selected={pathname === buildUrl(routes.clients)}
                            component={props => <Link to={buildUrl(routes.clients)} {...props}/>}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Clients"/>
                        </ListItem>
                        <ListItem
                            button
                            selected={pathname === buildUrl(routes.transactions)}
                            component={props => <Link to={buildUrl(routes.transactions)} {...props}/>}>
                            <ListItemIcon>
                                <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Transactions"/>
                        </ListItem>
                    </div>
                </List>
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
