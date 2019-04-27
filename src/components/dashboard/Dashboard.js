import React, {Fragment} from 'react'
import * as PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {connect} from 'react-redux'
import * as immutable from 'immutable'

import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

import ClientsPerDay from '../clients/ClientsPerDay'
import LastTransactionsTable from '../transactions/LastTransactionsTable'
import {buildUrl, routes} from '../../utils/routes'
import {fetchContractIfNeeded} from '../../modules/actions/contract'

const styles = ({
    zero: {
        paddingTop: 0,
        paddingBottom: 0,
        '&:last-child': {
            paddingTop: 12,
            paddingBottom: 12,
        }
    },
    strong: {
        fontWeight: 550,
        fontSize: 18,
    },
    linkTitle: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        textDecoration: 'none',
        cursor: 'pointer',
    },
    link: {
        cursor: 'pointer',
    },
    chartContainer: {
        marginLeft: -22,
    },
    card: {
        minWidth: 275,
    },
    tableContainer: {
        height: 320,
    },
})


class Dashboard extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchContractIfNeeded())
    }

    shouldComponentUpdate = (nextProps) => {
        return this.props.contract !== nextProps.contract
    }

    render() {
        const {contract, isFetchingContract, classes, className, ...other} = this.props

        if (isFetchingContract) {
            return null
        }

        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={12} className={classes.link}>
                        <Card className={classes.card}>
                            <CardContent className={classNames(classes.zero, className)} {...other}>
                                <Typography component="span">
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <label className={classes.strong}>Dapp Contract:</label>
                                        </Grid>
                                        <Grid item>
                                            {contract.get('address')}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            className={classNames(classes.linkTitle, classes.strong)}
                            component={props => <Link to={buildUrl(routes.clients)} {...props}/>}>
                            Clients per day
                        </Typography>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography component="div" className={classes.chartContainer}>
                                    <ClientsPerDay/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            className={classNames(classes.linkTitle, classes.strong)}
                            component={props => <Link to={buildUrl(routes.transactions)} {...props}/>}>
                            Last Transactions
                        </Typography>
                        <div className={classes.tableContainer}>
                            <LastTransactionsTable address={contract.get('address')}/>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    contract: PropTypes.instanceOf(immutable.Map).isRequired,
    isFetchingContract: PropTypes.bool.isRequired,
    openModalContractUpdate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const contract = state.get('contract') || immutable.Map({isFetching: true, data: immutable.Map()})
    return {
        contract: contract.get('data'),
        isFetchingContract: contract.get('isFetching')
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard))
