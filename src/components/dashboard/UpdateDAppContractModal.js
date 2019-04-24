import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'


class UpdateDAppContractModal extends React.Component {
    state = {
        dAppContract: '',
    }

    handleChange = (event) => {
        this.setState({dAppContract: event.target.value})
    }

    handleUpdate = () => {
        this.props.updateDAppContract(this.state.dAppContract)
    }

    handleClose = () => {
        this.props.openModalContractUpdate()
    }

    render() {
        const {shouldOpen} = this.props
        const {dAppContract} = this.state

        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={shouldOpen}
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
                            value={dAppContract}
                            onChange={this.handleChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
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

UpdateDAppContractModal.propTypes = {
    openModalContractUpdate: PropTypes.func.isRequired,
    updateDAppContract: PropTypes.func.isRequired,
    shouldOpen: PropTypes.bool.isRequired,
}

export default UpdateDAppContractModal