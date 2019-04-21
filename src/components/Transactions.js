import React from 'react'
import moment from 'moment'
import ReactTimeAgo from 'react-time-ago'
import {Container, HeaderMenu, Header, Table, Page, Mana} from 'decentraland-ui'

import {getTransactions} from '../apis/transactions'


class Transactions extends React.Component {
    state = {
        txs: null
    }

    componentDidMount = () => {
        getTransactions().then(txs => this.setState({txs: txs}))
    }

    renderTransactions = () => {
        const {txs} = this.state

        return txs.map((tx, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        <span className="hash-tag text-truncate">
                            <a
                                className="ui basic button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://etherscan.io/block/${tx.get('blockHash')}`}>
                                {tx.get('blockHash')}
                            </a>
                        </span>
                    </Table.Cell>
                    <Table.Cell>
                        <ReactTimeAgo
                            className="light-grey-ic"
                            date={moment.utc(new Date(tx.get('timeStamp') * 1000)).toDate()}/>
                    </Table.Cell>
                    <Table.Cell>{tx.get('blockNumber')}</Table.Cell>
                    <Table.Cell>
                        <Mana size="small">
                            {tx.get('gasPrice') / 21000}
                        </Mana>
                    </Table.Cell>
                    <Table.Cell>
                        <span className="hash-tag text-truncate">
                            <a
                                className="ui basic button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://etherscan.io/address/${tx.get('from')}`}>
                                {tx.get('from')}
                            </a>
                        </span>
                    </Table.Cell>
                    <Table.Cell>
                        <span className="hash-tag text-truncate">
                            <a
                                className="ui basic button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://etherscan.io/address/${tx.get('to')}`}>
                                {tx.get('to')}
                            </a>
                        </span>
                    </Table.Cell>
                    <Table.Cell>{tx.get('gas') / 21000}</Table.Cell>
                </Table.Row>
            )
        })
    }

    render = () => {
        const {txs} = this.state

        if (!txs) {
            return null
        }

        return (
            <Page>
                <Container>
                    <HeaderMenu>
                        <HeaderMenu.Left>
                            <Header size="large">Transactions</Header>
                        </HeaderMenu.Left>
                    </HeaderMenu>
                    <Table basic="very">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>TxHash</Table.HeaderCell>
                                <Table.HeaderCell>Age</Table.HeaderCell>
                                <Table.HeaderCell>Block</Table.HeaderCell>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                                <Table.HeaderCell>From</Table.HeaderCell>
                                <Table.HeaderCell>To</Table.HeaderCell>
                                <Table.HeaderCell>TxFee</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderTransactions()}
                        </Table.Body>
                    </Table>
                </Container>
            </Page>
        )
    }
}

export default Transactions
