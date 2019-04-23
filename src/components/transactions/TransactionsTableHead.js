import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell/index'
import TableHead from '@material-ui/core/TableHead/index'
import TableRow from '@material-ui/core/TableRow/index'
import TableSortLabel from '@material-ui/core/TableSortLabel/index'
import Tooltip from '@material-ui/core/Tooltip/index'

const rows = [
    {id: 'blockHash', disablePadding: false, label: 'TxHash'},
    {id: 'timeStamp', disablePadding: false, label: 'Age'},
    {id: 'gasPrice', disablePadding: false, label: 'Value'},
    {id: 'gas', disablePadding: false, label: '[TxFee]'},
]


class TransactionsTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property)
    }

    render() {
        const {order, orderBy} = this.props

        return (
            <TableHead>
                <TableRow>
                    {rows.map((row, index) => (
                        <TableCell
                            key={index}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === row.id ? order : false}>
                            <Tooltip
                                title="Sort"
                                placement={'bottom-start'}
                                enterDelay={300}>
                                <TableSortLabel
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={this.createSortHandler(row.id)}>
                                    {row.label}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }
}

TransactionsTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
}

export default TransactionsTableHead
