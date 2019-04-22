import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'

import ClientsPerDay from './ClientsPerDay'

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    chartContainer: {
        marginLeft: -22,
    },
})


class Dashboard extends React.Component {
    state = {
        open: false,
    }

    render() {
        const {classes} = this.props

        return (
            <Fragment>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Clients per day
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <ClientsPerDay/>
                </Typography>
            </Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)
