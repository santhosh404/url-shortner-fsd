import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export default function ConfirmationDialog({ handleClose, open, title, description, loading, handleConfirm }) {
    return (
        <>
            <Dialog onClose={handleClose} open={open} sx={{ padding: '10px' }}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{textTransform: 'capitalize'}} variant='outlined'>No, Cancel</Button>
                    <LoadingButton onClick={handleConfirm} loading={loading} sx={{textTransform: 'capitalize'}} variant='contained' color='error'>Yes, I'm Sure</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
