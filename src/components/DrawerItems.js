import React from 'react'
import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem/index'
import ListItemIcon from '@material-ui/core/ListItemIcon/index'
import ListItemText from '@material-ui/core/ListItemText/index'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'

import {routes, buildUrl} from '../utils/routes'

export const DrawerItems = (
    <div>
        <ListItem button component={props => <Link to={buildUrl(routes.dashboard)} {...props}/>}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button component={props => <Link to={buildUrl(routes.clients)} {...props}/>}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Clients"/>
        </ListItem>
        <ListItem button component={props => <Link to={buildUrl(routes.transactions)} {...props}/>}>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Transactions"/>
        </ListItem>
    </div>
)