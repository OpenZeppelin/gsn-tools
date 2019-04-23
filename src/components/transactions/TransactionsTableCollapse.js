import React from 'react'
import PropTypes from 'prop-types'
import immutable from 'immutable'
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'
import Grid from '@material-ui/core/Grid/index'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    grid: {
        flexGrow: 1,
    },
})


class TransactionsTableCollapse extends React.PureComponent {
    render = () => {
        const {classes, tx} = this.props
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container spacing={16}>
                            <Grid item>
                                <label>Block</label>
                            </Grid>
                            <Grid item>
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://etherscan.io/block/${tx.get('blockNumber')}`}>
                                    {tx.get('blockNumber')}
                                </a>
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container spacing={16}>
                            <Grid item>
                                <label>From</label>
                            </Grid>
                            <Grid item>
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://etherscan.io/address/${tx.get('from')}`}>
                                    {tx.get('from')}
                                </a>
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container spacing={16}>
                            <Grid item>
                                <label>To</label>
                            </Grid>
                            <Grid item>
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://etherscan.io/address/${tx.get('to')}`}>
                                    {tx.get('to')}
                                </a>
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

TransactionsTableCollapse.propTypes = {
    classes: PropTypes.object.isRequired,
    tx: PropTypes.instanceOf(immutable.Map).isRequired,
}

export default withStyles(styles)(TransactionsTableCollapse)
