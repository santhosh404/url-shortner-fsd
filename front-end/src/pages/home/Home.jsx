import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Button, Card, CircularProgress, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getUrlDetails } from '../../services/UrlServices';

export default function Home() {
  const navigate = useNavigate();
  const [urlDetails, setUrlDetails] = useState();
  const [loading, setLoading] = useState(false);

  const myUrlDetails = async () => {
    setLoading(true);
    try {
      const response = await getUrlDetails();
      if (response) {
        console.log(response)
        setUrlDetails(response?.data?.data);
        setLoading(false);
      }
    }
    catch (err) {
      showToast('error', err.message || err.response.data.data.error);
      setLoading(false);
    }
  }

  useEffect(() => {
    myUrlDetails();
  }, [])


  return (
    <>
      <Navbar />
      <Container maxWidth='xl' className='mt-14 md:mt-24'>
        <div className='flex justify-center items-center gap-5 flex-wrap'>
          <Card className='p-5 w-[400px] h-[300px] flex flex-col justify-center items-center'>
            <Typography variant='h5' textAlign={'center'}>Total Urls Shortened</Typography>
            {
              loading ? <CircularProgress /> : <p className='text-[70px] font-[900]'>{urlDetails?.totalUrls}</p>
            }

          </Card>
          <Card className='p-5 w-[400px] h-[300px] flex flex-col justify-center items-center'>
            <Typography variant='h5' textAlign={'center'}>Total Urls Shortened Today</Typography>
            {
              loading ? <CircularProgress /> : <p className='text-[70px] font-[900]'>{urlDetails?.todayUrls}</p>
            }
          </Card>
          <Card className='p-5 w-[400px] h-[300px] flex flex-col justify-center items-center'>
            <Typography variant='h5' textAlign={'center'} className=''>Total Urls Shortened This Month</Typography>
            {
              loading ? <CircularProgress /> : <p className='text-[70px] font-[900]'>{urlDetails?.currentMonthUrls}</p>
            }
          </Card>
        </div>
        <div className='flex justify-center mt-10'>
          <Button variant='contained' sx={{ textTransform: 'capitalize' }} onClick={() => navigate('/user/my-urls')}>See Your Urls</Button>
        </div>
      </Container>

    </>
  )
}
