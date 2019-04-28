import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as immutable from 'immutable'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import {receiveContract} from '../modules/actions/contract'
import ZeppelinLogo from '../utils/ZeppelinLogo'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    logo: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})


class Landing extends React.Component {
    state = {
        contractAddress: null,
    }

    handleChange = (event) => {
        this.setState({contractAddress: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(receiveContract(immutable.Map({address: this.state.contractAddress})))
    }

    render = () => {
        const {classes} = this.props

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography className={classes.logo}>
                        <ZeppelinLogo/>
                    </Typography>
                    <Typography component="h1" variant="h5">
                        DApp Management Tool
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="contractAddress">Contract Address</InputLabel>
                            <Input id="contractAddress" name="contractAddress" autoComplete="contractAddress" autoFocus
                                   onChange={this.handleChange}/>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

Landing.propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect()(Landing))