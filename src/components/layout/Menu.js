import React from 'react'

import DrawerMUI from './DrawerMUI'
import AppBarMUI from './AppBarMUI'


class Layout extends React.Component {
    state = {
        openDrawer: false,
    }

    handleDrawerOpen = () => {
        this.setState({openDrawer: true})
    }

    handleDrawerClose = () => {
        this.setState({openDrawer: false})
    }

    render() {
        const {openDrawer} = this.state

        return (
            <React.Fragment>
                <AppBarMUI
                    open={openDrawer}
                    handleDrawerOpen={this.handleDrawerOpen}/>
                <DrawerMUI
                    open={openDrawer}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleDrawerClose={this.handleDrawerClose}/>
            </React.Fragment>
        )
    }
}

export default Layout