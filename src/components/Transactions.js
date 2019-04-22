import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'
import TransactionsTable from './TransactionsTable'

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    tableContainer: {
        height: 320,
    },
})


class Transactions extends React.Component {
    state = {
        open: false,
    }

    render = () => {
        const {classes} = this.props

        return (
            <Fragment>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Transactions
                </Typography>
                <div className={classes.tableContainer}>
                    <TransactionsTable/>
                </div>
            </Fragment>
        )
    }
}


Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Transactions)
