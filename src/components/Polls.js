import React from 'react'
import immutable from 'immutable'
import moment from 'moment'
import { Container, HeaderMenu, Dropdown, Header, Table } from 'decentraland-ui'
import ReactTimeAgo from 'react-time-ago'


class Polls extends React.Component {

    state = {
        txs: null
    }

    componentDidMount = () => {
        this.getTxs().then(txs => this.setState({txs: txs}))
    }

    getTxs = async () => {

        const location = 'api.etherscan.io'
        const apiKey = 'Y35EQ8MWSNY547KX9EAUGUBPA4SXK8C7CN'

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }

        return await fetch(`http://${location}/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&apikey=${apiKey}`, settings)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Transactions not found')
                }
            })
            .then((json) => {
                if (json.message === 'NOTOK') {
                    throw new Error('Transactions not found')
                } else {
                    return immutable.fromJS(json.result)
                }
            })
            .catch(() => {
                return immutable.List()
            })
    }

    renderTransactions = () => {
        const { txs } = this.state

        return txs.map((tx, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        <span className="hash-tag text-truncate">
                            <a
                                className=""
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
                            tooltip={false}
                            date={moment.utc(new Date(tx.get('timeStamp') * 1000)).toDate()}/>
                    </Table.Cell>
                    <Table.Cell>{tx.get('blockNumber')}</Table.Cell>
                    <Table.Cell>{tx.get('gasPrice') / 21000}</Table.Cell>
                    <Table.Cell>
                        <span className="hash-tag text-truncate">
                            <a
                                className=""
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
                                className=""
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
        const { txs } = this.state

        if(!txs) {
            return null
        }

        return (
            <Container>
                <HeaderMenu>
                    <HeaderMenu.Left>
                        <Header size="large">District polls</Header>
                    </HeaderMenu.Left>
                    <HeaderMenu.Right>
                        <Dropdown text="All polls" direction="right">
                            <Dropdown.Menu>
                                <Dropdown.Item text="All polls" />
                                <Dropdown.Item text="Ongoing polls" />
                                <Dropdown.Item text="Closed polls" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </HeaderMenu.Right>
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
        )
    }
}

export default Polls
