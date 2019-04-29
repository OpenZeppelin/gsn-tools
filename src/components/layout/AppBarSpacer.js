import React from 'react'
import * as PropTypes from 'prop-types'

import {withStyles, withTheme} from '@material-ui/core/styles/index'

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
})

const AppBarSpacer = (props) => (
    <div className={props.classes.appBarSpacer}/>
)

AppBarSpacer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withTheme()(withStyles(styles)(AppBarSpacer))
