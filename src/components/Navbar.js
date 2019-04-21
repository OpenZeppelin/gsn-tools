import React from 'react'
import classNames from 'classnames'
import {Menu, Container, Responsive, Header, Icon} from 'decentraland-ui'

import routes, {buildUrl} from '../utils/routes'

class Navbar extends React.Component {
    state = {
        toggle: false
    }

    handleToggle = event => {
        this.setState({toggle: !this.state.toggle})
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
    }

    getActivePage = () => {
        let activePage
        switch (window.location.pathname) {
            case buildUrl(routes.dashboard):
                activePage = 'Dashboard'
                break
            case buildUrl(routes.clients):
                activePage = 'Clients'
                break
            case buildUrl(routes.transactions):
                activePage = 'Transactions'
                break
            default:
                activePage = 'Jorge'
                break
        }
        return activePage
    }

    renderMenu = () => {
        const pathname = window.location.pathname
        return (
            <React.Fragment>
                <Menu.Item
                    href={buildUrl(routes.dashboard)}
                    active={pathname === buildUrl(routes.dashboard)}>
                    Dashboard
                </Menu.Item>
                <Menu.Item
                    href={buildUrl(routes.clients)}
                    active={pathname === buildUrl(routes.clients)}>
                    Clients
                </Menu.Item>
                <Menu.Item
                    href={buildUrl(routes.transactions)}
                    active={pathname === buildUrl(routes.transactions)}>
                    Transactions
                </Menu.Item>
            </React.Fragment>
        )
    }

    render = () => {
        const {toggle} = this.state
        return (
            <div className="Navbar-story-container">
                <div className={classNames('dcl navbar', {'open': toggle})}role="navigation">
                    <Container>
                        <div
                            className="dcl navbar-menu">
                            <Responsive
                                as={Menu}
                                secondary
                                stackable
                                minWidth={Responsive.onlyTablet.minWidth}>
                                <a className="dcl navbar-logo" href={buildUrl(routes.index)}>
                                    <i className="logo"/>
                                </a>
                                {this.renderMenu()}
                            </Responsive>
                            <Responsive {...Responsive.onlyMobile} className="dcl navbar-mobile-menu">
                                <a className="dcl navbar-logo" href={buildUrl(routes.index)}>
                                    <i className="logo"/>
                                </a>
                                <Header
                                    size="small"
                                    className={classNames(
                                        'dcl active-page',
                                        {
                                            'caret-up': toggle,
                                            'caret-down': !toggle
                                        })
                                    }
                                    onClick={this.handleToggle}>
                                    {this.getActivePage()}
                                </Header>
                            </Responsive>
                        </div>
                        <div className="dcl navbar-account">
                            <Responsive
                                as={Menu}
                                secondary
                                className="dcl navbar-account-menu"
                                minWidth={Responsive.onlyTablet.minWidth}>
                                <Menu.Item>
                                    <Icon name="bell"/>
                                </Menu.Item>
                            </Responsive>
                        </div>
                    </Container>
                    <div className="mobile-menu">{this.renderMenu()}</div>
                </div>
            </div>
        )
    }
}

export default Navbar
