import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function NewInvoice(props) {
    const { handleClickOpen, handleCloseItemRmove, open, deleteItem } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleCloseItemRmove} aria-labelledby="form-dialog-title">
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is will remove this!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseItemRmove} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteItem} color="secondary">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewInvoice
