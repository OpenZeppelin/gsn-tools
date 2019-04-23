import React, {Fragment} from 'react'
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
import TablePagination from '@material-ui/core/TablePagination/index'
import Collapse from '@material-ui/core/Collapse/index'

import TransactionsTableHead from './TransactionsTableHead'
import {getTransactions} from '../../apis/transactions'
import TransactionsTableCollapse from './TransactionsTableCollapse'
import {getSorting, stableSort} from '../../utils/sorting'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Account "0x00a329c0648769A73afAc7F9381E08FB43dBEA72" web3.eth.getAccounts(console.log)
// Balance "1606938044258990275541962092341162602522202993782792835301376" web3.eth.getBalance(account)
// BlockNumber 0 web3.eth.getBlockNumber(console.log)

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {},
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
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})


class TransactionsTable extends React.Component {
    state = {
        txs: null,
        page: 0,
        rowsPerPage: 10,
        order: 'desc',
        orderBy: 'timeStamp',
        expanded: null,
    }

    componentDidMount = () => {
        getTransactions().then(txs =>
            this.setState({txs: txs})
        )
    }

    handleChangePage = (event, page) => {
        this.setState({expanded: null},
            () => this.setState({page}))
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.setState({expanded: null},
            () => this.setState({order, orderBy}))
    }

    handleRowClick = (index) => {
        this.setState((prevState) => ({
            expanded: prevState.expanded === index ? null : index
        }))
    }

    render = () => {
        const {classes} = this.props
        const {txs, order, orderBy, rowsPerPage, page, expanded} = this.state

        if (!txs) {
            return null
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table>
                        <TransactionsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}/>
                        <TableBody>
                            {stableSort(txs.toArray(), getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((tx, index) => (
                                    <Fragment key={index}>
                                        <TableRow hover={true} onClick={() => this.handleRowClick(index)}>
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
                                            <TableCell>{web3.utils.fromWei(tx.get('gasPrice'), 'ether')}</TableCell>
                                            <TableCell>{web3.utils.fromWei(tx.get('gas'), 'ether')}</TableCell>
                                        </TableRow>
                                        <Collapse
                                            mountOnEnter
                                            unmountOnExit
                                            in={expanded === index}
                                            component={(props) => (
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        <Paper elevation={1} className={classes.paper}>
                                                            {props.children}
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                            )}>
                                            <TransactionsTableCollapse tx={tx}/>
                                        </Collapse>
                                    </Fragment>
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
                    onChangePage={this.handleChangePage}/>
            </Paper>
        )
    }
}


TransactionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TransactionsTable)
