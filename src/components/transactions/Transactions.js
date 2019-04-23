import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'

import TransactionsTable from './TransactionsTable'

const styles = ({
    tableContainer: {
        height: 320,
    },
})


class Transactions extends React.Component {
    render = () => {
        const {classes} = this.props

        return (
            <Fragment>
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
