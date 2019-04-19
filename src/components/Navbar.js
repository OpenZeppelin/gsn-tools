import React from 'react'
import { Menu, Container, Responsive, Header } from 'decentraland-ui'

import routes, {buildUrl} from '../utils/routes'

class Navbar extends React.Component {

    state = {
        toggle: false
    }

    handleToggle = event => {
        this.setState({ toggle: !this.state.toggle })
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
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

        return (
            <div className="Navbar-story-container">
                <div className='dcl navbar' role="navigation">
                    <Container>
                        <div className="dcl navbar-menu">
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
                                <a className="dcl navbar-logo" href="https://decentraland.org">
                                    <i className="logo"/>
                                </a>
                                <Header
                                    size="small"
                                    className={`dcl active-page ${
                                    this.state.toggle ? 'caret-up' : 'caret-down'
                                    }`}
                                    onClick={this.handleToggle}>
                                    Dashboard
                                </Header>
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
