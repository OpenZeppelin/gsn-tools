import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import ReactTimeAgo from 'react-time-ago'
import Web3 from 'web3'

import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import {getTransactions} from '../../apis/etherscan'
import {getSorting, stableSort} from '../../utils/sorting'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const styles = theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    hash: {
        maxWidth: 132,
        display: 'inline-block',
        verticalAlign: 'bottom',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    noData: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.action.disabledBackground,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

const rows = [
    {id: 'blockHash', disablePadding: false, label: 'TxHash'},
    {id: 'block', disablePadding: false, label: 'Block'},
    {id: 'timeStamp', disablePadding: false, label: 'Age'},
    {id: 'from', disablePadding: false, label: 'From'},
    {id: 'to', disablePadding: false, label: 'To'},
    {id: 'gasPrice', disablePadding: false, label: 'Value'},
    {id: 'gas', disablePadding: false, label: '[TxFee]'},
]


class LastTransactionsTable extends React.Component {
    state = {
        txs: null,
        page: 0,
        rowsPerPage: 5,
        order: 'desc',
        orderBy: 'timeStamp',
    }

    componentDidMount = () => {
        getTransactions(this.props.address).then(txs =>
            this.setState({txs: txs})
        )
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.address !== prevProps.address) {
            getTransactions(this.props.address).then(txs =>
                this.setState({txs: txs})
            )
        }
    }

    render = () => {
        const {classes} = this.props
        const {txs, order, orderBy, rowsPerPage, page} = this.state

        if (!txs) {
            return (
                <Paper className={classes.noData} elevation={1}>
                    <LinearProgress variant="query"/>
                </Paper>
            )
        }

        if (txs.size === 0) {
            return (
                <Paper className={classes.noData} elevation={1}>
                    <Typography variant="h6" component="h4">
                        No transactions were found for this account.
                    </Typography>
                </Paper>
            )
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map((row, index) => (
                                    <TableCell
                                        key={index}
                                        padding={row.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === row.id ? order : false}>
                                        {row.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(txs.toArray(), getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((tx, index) => (
                                    <Fragment key={index}>
                                        <TableRow hover={true}>
                                            <TableCell>
                                                <span className={classes.hash}>
                                                    <a
                                                        className={classes.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={`https://etherscan.io/tx/${tx.get('blockHash')}`}>
                                                        {tx.get('blockHash')}
                                                    </a>
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={classes.hash}>
                                                    <a
                                                        className={classes.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={`https://etherscan.io/block/${tx.get('blockNumber')}`}>
                                                        {tx.get('blockNumber')}
                                                    </a>
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <ReactTimeAgo
                                                    date={moment.utc(new Date(tx.get('timeStamp') * 1000)).toDate()}/>
                                            </TableCell>
                                            <TableCell>
                                                <span className={classes.hash}>
                                                    <a
                                                        className={classes.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={`https://etherscan.io/address/${tx.get('from')}`}>
                                                        {tx.get('from')}
                                                    </a>
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={classes.hash}>
                                                    <a
                                                        className={classes.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={`https://etherscan.io/address/${tx.get('to')}`}>
                                                        {tx.get('to')}
                                                    </a>
                                                </span>
                                            </TableCell>
                                            <TableCell>{web3.utils.fromWei(tx.get('gasPrice'), 'ether')}</TableCell>
                                            <TableCell>{web3.utils.fromWei(tx.get('gas'), 'ether')}</TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }
}

LastTransactionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    address: PropTypes.string,
}

export default withStyles(styles)(LastTransactionsTable)
