import React, {Fragment} from 'react'
import * as immutable from 'immutable'
import {connect} from 'react-redux'
import * as PropTypes from 'prop-types'
import {withStyles, withTheme} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import TransactionsTable from './TransactionsTable'

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


class Transactions extends React.Component {
    shouldComponentUpdate = (nextProps) => {
        return this.props.contract !== nextProps.contract
    }

    render = () => {
        const {contract, isFetchingContract, classes} = this.props

        if (isFetchingContract) {
            return null
        }

        return (
            <Fragment>
                <Typography variant="h5" className={classes.title}>
                    Transactions
                </Typography>
                <div className={classes.tableContainer}>
                    <TransactionsTable address={contract.get('address')}/>
                </div>
            </Fragment>
        )
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
    contract: PropTypes.instanceOf(immutable.Map).isRequired,
    isFetchingContract: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const contract = state.get('contract') || immutable.Map({isFetching: true, data: immutable.Map()})
    return {
        contract: contract.get('data'),
        isFetchingContract: contract.get('isFetching')
    }
}

export default withTheme()(withStyles(styles)(connect(mapStateToProps)(Transactions)))
