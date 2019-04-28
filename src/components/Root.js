import '../bootstrap'
import React from 'react'
import 'typeface-roboto'

import {MuiThemeProvider} from '@material-ui/core/styles'

import {theme} from '../theme'
import Layout from './layout/Layout'


class Root extends React.Component {
    render = () => {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <Layout/>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default Root
