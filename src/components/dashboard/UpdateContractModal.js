import React from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {receiveContract} from '../../modules/actions/contract'
import {hideModalUpdateContract} from '../../modules/actions/contractModal'


class UpdateContractModal extends React.Component {
    state = {
        address: '',
        shouldOpen: false,
    }

    handleChange = (event) => {
        this.setState({address: event.target.value})
    }

    handleUpdate = () => {
        const {dispatch} = this.props
        dispatch(receiveContract(immutable.Map({address: this.state.address})))
        dispatch(hideModalUpdateContract())
    }

    handleClose = () => {
        const {dispatch} = this.props
        dispatch(hideModalUpdateContract())
    }

    render() {
        const {address} = this.state
        const {show} = this.props
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={show}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update DApp Contract</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dAppContract"
                            label="DApp Contract"
                            type="hex"
                            fullWidth
                            value={address}
                            onChange={this.handleChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} disabled={!address} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

UpdateContractModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    const contractModal = state.get('contractModal') || immutable.Map({show: false})
    return {
        show: contractModal.get('show'),
    }
}

export default connect(mapStateToProps)(UpdateContractModal)