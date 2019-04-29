import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Web3 from 'web3'
import ReactTimeAgo from 'react-time-ago/modules/ReactTimeAgo'

import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import TransactionsTableHead from './TransactionsTableHead'
import {getTransactions} from '../../apis/etherscan'
import {getSorting, stableSort} from '../../utils/sorting'
import TransactionsTableCollapse from './TransactionsTableCollapse'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

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
    noData: {
        ...theme.mixins.gutters(),
        marginTop: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.action.disabledBackground,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        backgroundColor: '#fafafa',
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
        getTransactions(this.props.address).then(txs =>
            this.setState({txs: txs})
        )
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.address !== prevProps.address) {
            this.setState({txs: null}, () => {
                getTransactions(this.props.address).then(txs =>
                    this.setState({txs: txs})
                )
            })
        }
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
                        <TransactionsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}/>
                        <TableBody>
                            {stableSort(txs.toArray(), getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((tx, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <TableRow hover={true} onClick={() => this.handleRowClick(index)}>
                                                <TableCell>
                                                    <span className={classes.hash}>
                                                        {tx.get('blockHash')}
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
                                                            <Paper className={classes.paper}>
                                                                {props.children}
                                                            </Paper>
                                                        </TableCell>
                                                    </TableRow>
                                                )}>
                                                <TransactionsTableCollapse tx={tx}/>
                                            </Collapse>
                                        </Fragment>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={txs.size}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={this.handleChangePage}/>
            </Paper>
        )
    }
}

TransactionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    address: PropTypes.string,
}

export default withStyles(styles)(TransactionsTable)
