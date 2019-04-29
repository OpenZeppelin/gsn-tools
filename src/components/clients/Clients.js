import React, {Fragment} from 'react'
import * as PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import {withStyles, withTheme} from '@material-ui/core'

import NoRecordsFound from '../layout/NoRecordsFound'

const styles = theme => ({
    tableContainer: {
        height: 320,
    },
    title: {
        fontWeight: 300,
        fontSize: `${1.75}em`,
        marginBottom: theme.spacing.unit * 2,
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
                    <NoRecordsFound>
                        No clients were found for this contract address.
                    </NoRecordsFound>
                </div>
            </Fragment>
        )
    }
}

Clients.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withTheme()(withStyles(styles)(Clients))
