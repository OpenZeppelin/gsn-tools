import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'
import Card from '@material-ui/core/Card/index'
import CardContent from '@material-ui/core/CardContent/index'
import Grid from '@material-ui/core/Grid/index'

import ClientsPerDay from '../clients/ClientsPerDay'
import LastTransactionsTable from '../transactions/LastTransactionsTable'
import {buildUrl, routes} from '../../utils/routes'

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
    shouldComponentUpdate = (nextProps) => {
        return this.props.dAppContract !== nextProps.dAppContract
    }

    render() {
        const {dAppContract, openModalContractUpdate, classes, className, ...other} = this.props
        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <CardContent className={classNames(classes.zero, className)} {...other}>
                                <Typography component="span">
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <label className={classes.strong}>Dapp Contract:</label>
                                        </Grid>
                                        <Grid item onClick={openModalContractUpdate}>
                                            {dAppContract}
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
                            <LastTransactionsTable/>
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
    dAppContract: PropTypes.string,
    openModalContractUpdate: PropTypes.func.isRequired,
}

export default withStyles(styles)(Dashboard)
