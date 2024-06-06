import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

export default function ResetPasswordComponent({ formik, loading }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }
    return (
        <Card className='py-5 px-20'>
            <div className='flex justify-center gap-2 flex-col items-center'>
                <h1 className='text-3xl font-[900]'>Reset Password</h1>
                <p>Reset your old password with the new one here!</p>
            </div>

            {/* Inputs */}
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 my-5'>
                    <div className='flex flex-col gap-1'>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel>
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
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                    <div className='flex flex-col gap-1'>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" size='small'>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                size='small'
                                name='confirmPassword'
                                endAdornment={
                                    <InputAdornment position="end" size='small'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {
                            formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <small className='text-[red]'>
                                    {formik.errors.confirmPassword}
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
        </Card>
    )
}
