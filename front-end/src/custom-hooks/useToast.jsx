import { useState, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export function useToast() {
    const [toast, setToast] = useState({ open: false, status: '', message: '' });

    const showToast = useCallback((status, message) => {
        setToast({ open: true, status, message });
    }, []);

    const handleClose = useCallback(() => {
        setToast((prev) => ({ ...prev, open: false }));
    }, []);

    const Toast = (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={toast.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={toast.status} sx={{ width: '100%', textAlign: 'start', display: 'flex', alignItems: 'center' }}>
                {toast.message}
            </Alert>
        </Snackbar>
    );

    return { Toast, showToast };
}
