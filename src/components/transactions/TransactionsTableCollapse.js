import React from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'

import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
    hr: {
        border: 0,
        borderTop: '1px solid #e7eaf3',
        marginTop: '.75rem',
        marginBottom: '.75rem',
        opacity: '.75',
    }
})


class TransactionsTableCollapse extends React.PureComponent {
    render = () => {
        const {classes, tx} = this.props
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} className={classes.noBottom}>
                    <Typography component="span">
                        <Grid container>
                            <Grid item xs={2}>
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
                    <hr className={classes.hr}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container>
                            <Grid item xs={2}>
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
                        <hr className={classes.hr}/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container>
                            <Grid item xs={2}>
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
                        <hr className={classes.hr}/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">
                        <Grid container>
                            <Grid item xs={2}>
                                <label>View more</label>
                            </Grid>
                            <Grid item>
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://etherscan.io/tx/${tx.get('blockHash')}`}>
                                    {'Etherscan.io'}
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
