import React from 'react';
import { Button, Card, Divider, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPasswordComponent({ formik, loading }) {

    const navigate = useNavigate()
    return (
        <Card className='py-5 px-20'>
            <div className='flex justify-center gap-2 flex-col items-center'>
                <h1 className='text-3xl font-[900]'>Forgot Password</h1>
                <p>Forgot your password. Don't worry! Enter your email id</p>
            </div>

            {/* Inputs */}
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 my-5'>
                    <div className='flex flex-col gap-1'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type='text'
                            size='small'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.email && formik.errors.email && (
                                <small className='text-[red]'>
                                    {formik.errors.email}
                                </small>
                            )
                        }
                    </div>
                    <LoadingButton
                        className='font-[500] lowercase'
                        sx={{
                            textTransform: 'capitalize'
                        }}
                        variant="contained"
                        type='submit'
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                </div>
            </form>
            <div className='flex justify-end'>
                <Link to='/sign-in' className='underline text-[#1976d2]'>Remember password?</Link>
            </div>
        </Card>
    )
}
