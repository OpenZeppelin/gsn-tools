import React from 'react'
import * as PropTypes from 'prop-types'

import {withStyles, withTheme} from '@material-ui/core/styles/index'
import Paper from '@material-ui/core/Paper/index'
import Typography from '@material-ui/core/Typography/index'

const styles = theme => ({
    noData: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.action.disabledBackground,
    },
})


const NoRecordsFound = (props) => (
    <Paper className={props.classes.noData} elevation={1}>
        <Typography variant="h6" component="h4">
            {props.children}
        </Typography>
    </Paper>
)

NoRecordsFound.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withTheme()(withStyles(styles)(NoRecordsFound))
