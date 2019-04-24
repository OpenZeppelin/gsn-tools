import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import TransactionsTable from './TransactionsTable'

const styles = ({
    tableContainer: {
        height: 320,
    },
})


class Transactions extends React.Component {
    render = () => {
        const {classes, dAppContract} = this.props

        return (
            <Fragment>
                <Typography variant="h4" gutterBottom component="h2">
                    Transactions
                </Typography>
                <div className={classes.tableContainer}>
                    <TransactionsTable dAppContract={dAppContract}/>
                </div>
            </Fragment>
        )
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
    dAppContract: PropTypes.string,
}

export default withStyles(styles)(Transactions)
