import React, { useEffect, useState } from 'react';
import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { shortenUrl } from '../../services/UrlServices';
import { useToast } from "../../custom-hooks/useToast";
import { LoadingButton } from '@mui/lab';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useMain } from '../../context/MainContext';
import { getUser } from '../../services/UserServices';

export default function ShortenUrl() {
  const [loading, setLoading] = useState(false);
  const [isShortened, setIsShortened] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState();
  const { showToast, Toast } = useToast()

  const { getUserDetails } = useMain();

  const urlRegex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*\.[a-zA-Z]{1,}[-a-zA-Z0-9+&@#\/%=~_|]/
  const urlValidation = Yup.object().shape({
    url: Yup.string().required('Url is required!').matches(urlRegex, 'Please enter a valid URL')
  })


  const formik = useFormik({
    initialValues: {
      url: ''
    },
    validationSchema: urlValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await shortenUrl(values);
        showToast('success', response.data.message);
        setIsShortened(true);
        setShortenedUrl(`https://url-shortner-fsd.onrender.com/${response.data.data.shortenUrl.shortUrl}`)
        setLoading(false);
      }
      catch (err) {
        showToast('error', err.response.data.data.error || err.response.data.message || err.message);
        setLoading(false);

      }
    }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    showToast('success', 'Url copied to clipboard');
  }


  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth='lg' className='mt-20'>
        <Card className='p-10'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h1 className='text-[40px] font-[900]'>
              Short Your Long Url
            </h1>
            <Typography variant="body2">
              Shorten for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails, ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS, videos
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-10 flex gap-2 items-start'>
              <div className='flex flex-col gap-1 w-full'>
                <TextField
                  label='Long Url'
                  placeholder='Enter your long url here'
                  size='small'
                  className='w-full'
                  name='url'
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {
                  formik.touched.url && formik.errors.url && (
                    <small className='text-[red]'>
                      {formik.errors.url}
                    </small>
                  )
                }
              </div>

              <LoadingButton loading={loading} type='submit' sx={{ textTransform: 'capitalize', height: '40px' }} variant='contained' >
                Short
              </LoadingButton>
            </div>
          </form>

        </Card>
        {
          isShortened && (
            <div className='flex items-center gap-2 mt-20'>
              <div className='flex flex-col gap-2 w-full'>
                <h1 className='font-bold'>Copy And Paste Your Shortened Url Into Your Browser</h1>
                <div className='flex gap-2 items-center'>
                  <div className='w-full flex justify-start items-center rounded-md pl-3 h-10 border border-gray-400 bg-gray-200'>
                    {shortenedUrl}
                  </div>
                  <ContentPasteIcon onClick={handleCopy} className='cursor-pointer' />
                </div>
              </div>


            </div>
          )
        }
      </Container>
      {Toast}
    </>
  )
}
