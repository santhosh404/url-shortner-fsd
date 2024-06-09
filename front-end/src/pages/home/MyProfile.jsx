import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Button, Card, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip } from '@mui/material'
import { useMain } from '../../context/MainContext'
import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { deleteUser, updateUser } from '../../services/UserServices';
import { useToast } from '../../custom-hooks/useToast';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);

    const handleCancel = () => {
        setOpen(false);
    }

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const { userDetails, getUserDetails } = useMain()
    const { Toast, showToast } = useToast()

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
    const userValidation = Yup.object().shape({
        first_name: Yup.string().required('First name is required!'),
        last_name: Yup.string().required('Last name is required!'),
        email: Yup.string().required('Email is required!').email('Invalid email id format!'),
        password: Yup.string()
            .matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })
    })

    const formik = useFormik({
        initialValues: {
            first_name: userDetails?.first_name,
            last_name: userDetails?.last_name,
            email: userDetails?.email,
            password: ''
        },
        enableReinitialize: true,
        validationSchema: userValidation,
        onSubmit: async (values) => {
            setLoading(true);
            let { password, ...rest } = values;

            console.log(values.password);
            let payload = {};
            if(values.password !== "") {
                payload = {
                   ...values,
                    password: values.password
                }
            }
            else {
                payload = {
                   ...rest
                }
            }
            try {
                const response = await updateUser(payload);
                showToast("success", response.data.message)
                setIsEdit(false)
                setLoading(false);
                getUserDetails();
            }
            catch (err) {
                showToast("error", err.message);
                setLoading(false);
            }
        }
    })

    useEffect(() => {
        getUserDetails()
    }, [])

    const handleConfirm = async () => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteUser();
            showToast("success", response.data.message);
            setDeleteBtnLoading(false);
            setOpen(false);
            localStorage.clear();
            window.location.reload();
        }
        catch(err) {
            showToast("error", err.message);
            setDeleteBtnLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <Container maxWidth='md' className='my-20'>
                <h1 className='text-[20px] font-[800] my-5'>Welcome, {userDetails?.first_name + " " + userDetails?.last_name}</h1>
                <form onSubmit={formik.handleSubmit}>
                    <Card className='pb-10 px-10'>
                        <div className='flex justify-end my-5'>
                            <IconButton aria-label="edit" onClick={() => setIsEdit(!isEdit)}>
                                <Tooltip title='Edit'>
                                    <Edit />
                                </Tooltip>
                            </IconButton>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            <div className='w-full flex gap-2'>
                                <div className='flex flex-col w-full'>
                                    <TextField
                                        type='text'
                                        name='first_name'
                                        placeholder='Enter your first name'
                                        // label='First Name'
                                        size='small'
                                        value={formik.values.first_name}
                                        disabled={!isEdit}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.first_name && formik.errors.first_name && (
                                            <small className='text-[red]'>
                                                {formik.errors.first_name}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className='w-full flex flex-col'>
                                    <TextField
                                        type='text'
                                        name='last_name'
                                        placeholder='Enter your last name'
                                        // label='Last Name'
                                        size='small'
                                        value={formik.values.last_name}
                                        disabled={!isEdit}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.last_name && formik.errors.last_name && (
                                            <small className='text-[red]'>
                                                {formik.errors.last_name}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                            <TextField
                                type='email'
                                name='email'
                                // placeholder='Enter your email address'
                                // label='Email'
                                className='w-full'
                                size='small'
                                value={formik.values.email}
                                disabled
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            <div className='flex flex-col gap-1'>
                                <FormControl variant="outlined">
                                    {/* <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel> */}
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        size='small'
                                        name='password'
                                        endAdornment={
                                            <InputAdornment position="end" size='small'>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        // label="Password"
                                        placeholder='Password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEdit}
                                    />
                                </FormControl>
                                {
                                    formik.touched.password && formik.errors.password && (
                                        <small className='text-[red]'>
                                            {formik.errors.password}
                                        </small>
                                    )
                                }
                            </div>

                        </div>
                    </Card>
                    <div className='flex justify-between items-center mt-5'>
                        <LoadingButton loading={loading} onClick={() => setOpen(true)} variant='outlined' color='error' sx={{ textTransform: 'capitalize' }}>Delete My Account</LoadingButton>
                        <LoadingButton disabled={!isEdit} loading={loading} type='submit' variant='contained' sx={{ textTransform: 'capitalize' }}>Update</LoadingButton>
                    </div>
                </form>
                {Toast}
            </Container>
            <ConfirmationDialog
                open={open}
                loading={deleteBtnLoading}
                handleClose={handleCancel}
                handleConfirm={handleConfirm}
                title='Are you sure you want to delete your account?'
                description='You will not be able to recover your account once deleted.'
            />
        </>
    )
}
