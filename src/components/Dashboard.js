import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

import ClientsPerDay from './ClientsPerDay'
import LastTransactionsTable from './LastTransactionsTable'
import {buildUrl, routes} from '../utils/routes'

const styles = ({
    linkTitle: {
        marginBottom: 5,
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
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            className={classes.linkTitle}
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
                            className={classes.linkTitle}
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
}

export default withStyles(styles)(Dashboard)
