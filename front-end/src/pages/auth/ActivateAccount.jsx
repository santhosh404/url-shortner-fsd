import { Button, Card, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useState } from 'react';
import verified from "../../assets/Verified-badge.png"
import { useNavigate, useParams } from 'react-router-dom';
import error from '../../assets/error.png';
import { activateUser } from '../../services/AuthServices';
import { useToast } from '../../custom-hooks/useToast';

export default function ActivateAccount() {
    const { Toast, showToast } = useToast();
    const navigate = useNavigate()
    const { id } = useParams()
    const [isAccountActivated, setIsAccountActivated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const activateAccount = async () => {
        setIsLoading(true);
        try {
            const response = await activateUser(id);
            if (response) {
                setIsAccountActivated(true);
                setIsLoading(false);
            }
        }
        catch (error) {
            showToast('error', error.response.data.data.error);
            setIsAccountActivated(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        activateAccount()
    }, [])

    return (
        <Container maxWidth='sm' className='mt-20'>
            {
                isLoading ? (
                    <div className='flex justify-center items-center'>
                        <CircularProgress />
                    </div>
                ) : <Card className='p-10'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <img src={isAccountActivated ? verified : error} alt='activate-img' className='h-10 w-10' />
                        {isAccountActivated ? <div className='flex flex-col justify-center items-center gap-3'>
                            <h1 className='text-[30px] font-[700]'>Your account has been activated</h1>
                            <p>Yeehhh!, Your account has been successfully activated. Your now verified user in our site. Now you can login to your account with your credentials and Enjoy shortening your url</p>
                        </div> : <div className='flex flex-col justify-center items-center gap-3'>
                            <h1 className='text-[30px] font-[700]'>Problem in activating your account!</h1>
                            <p>There is some error in activating your account. Please look into it below and take actions based on that. If the error still persists register with different email id</p>
                        </div>}


                        <Button onClick={() => navigate('/sign-in')}
                            sx={{
                                textTransform: 'capitalize',
                                margin: '10px auto'
                            }}
                            variant='contained'

                        >Sign In</Button>
                    </div>
                </Card>
            }

            {Toast}
        </Container>

    )
}
