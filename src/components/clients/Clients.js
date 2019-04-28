import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core'

const styles = theme => ({
    noData: {
        ...theme.mixins.gutters(),
        marginTop: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.action.disabledBackground,
    },
    tableContainer: {
        height: 320,
    },
    title: {
        fontWeight: 300,
        fontSize: `${1.75}em`,
    },
})


class Clients extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Typography variant="h5" className={classes.title}>
                    Clients
                </Typography>
                <div className={classes.tableContainer}>
                    <Paper className={classes.noData} elevation={1}>
                        <Typography variant="h6" component="h4">
                            No clients were found for this account.
                        </Typography>
                    </Paper>
                </div>
            </Fragment>
        )
    }
}

Clients.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Clients)
