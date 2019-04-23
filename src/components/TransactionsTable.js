import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactTimeAgo from 'react-time-ago'
import Web3 from 'web3'
import {withStyles} from '@material-ui/core/styles/index'
import Table from '@material-ui/core/Table/index'
import TableBody from '@material-ui/core/TableBody/index'
import TableCell from '@material-ui/core/TableCell/index'
import TableRow from '@material-ui/core/TableRow/index'
import Paper from '@material-ui/core/Paper/index'
import TablePagination from '@material-ui/core/TablePagination'

import TransactionsTableHead from './TransactionsTableHead'
import {getTransactions} from '../apis/transactions'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

//Account "0x00a329c0648769A73afAc7F9381E08FB43dBEA72" web3.eth.getAccounts(console.log)
//Balance "1606938044258990275541962092341162602522202993782792835301376" web3.eth.getBalance(account)
//BlockNumber 0 web3.eth.getBlockNumber(console.log)

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
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
    }
})

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
    if (order === 'desc') {
        return (a, b) => desc(a, b, orderBy)
    }
    return (a, b) => -desc(a, b, orderBy)
}

function desc(a, b, orderBy) {
    if (b.get(orderBy) < a.get(orderBy)) {
        return -1
    }
    if (b.get(orderBy) > a.get(orderBy)) {
        return 1
    }
    return 0
}


class TransactionsTable extends React.Component {
    state = {
        txs: null,
        page: 0,
        rowsPerPage: 10,
        order: 'desc',
        orderBy: 'timeStamp',
    }

    componentDidMount = () => {
        getTransactions().then(txs =>
            this.setState({txs: txs})
        )
    }

    handleChangePage = (event, page) => {
        this.setState({page})
    }

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value})
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.setState({order, orderBy})
    }

    render = () => {
        const {classes} = this.props
        const {txs, order, orderBy, rowsPerPage, page} = this.state

        if (!txs) {
            return null
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TransactionsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}/>
                        <TableBody>
                            {stableSort(txs.toArray(), getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((tx, index) => (
                                    <TableRow key={index}>
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
                                            <ReactTimeAgo
                                                date={moment.utc(new Date(tx.get('timeStamp') * 1000)).toDate()}/>
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
                                        <TableCell>{web3.utils.fromWei(tx.get('gasPrice'), 'ether')}</TableCell>
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
                                        <TableCell>{web3.utils.fromWei(tx.get('gas'), 'ether')}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={txs.size}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
            </Paper>
        )
    }
}


TransactionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TransactionsTable)
