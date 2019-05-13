import React from 'react'
import {Link} from 'react-router-dom'
import * as PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'

import {buildUrl, routes} from '../../utils/routes'


const DrawerItems = (props) => (
    <React.Fragment>
        <ListItem
            button
            selected={props.pathname === buildUrl(routes.dashboard)}
            component={props => <Link to={buildUrl(routes.dashboard)} {...props}/>}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem
            button
            selected={props.pathname === buildUrl(routes.clients)}
            component={props => <Link to={buildUrl(routes.clients)} {...props}/>}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Clients"/>
        </ListItem>
        <ListItem
            button
            selected={props.pathname === buildUrl(routes.transactions)}
            component={props => <Link to={buildUrl(routes.transactions)} {...props}/>}>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Transactions"/>
        </ListItem>
    </React.Fragment>
)

DrawerItems.propTypes = {
    pathname: PropTypes.string.isRequired,
}

export default DrawerItems
