import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { CircularProgress, Container, TableFooter, TablePagination, Tooltip } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getMyUrls } from '../../services/UrlServices';
import { ContentPaste } from '@mui/icons-material';
import { useToast } from '../../custom-hooks/useToast';


export default function MyUrls() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [urls, setUrls] = useState({
        data: [],
        count: 0
    });
    const [loading, setLoading] = useState(false);

    const { Toast, showToast } = useToast();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };


    //Getting user urls
    const getUserUrls = async () => {
        setLoading(true);
        try {
            const response = await getMyUrls(page + 1, rowsPerPage);
            if (response) {
                setUrls({ count: response.data.data.totalCount, data: response.data.data.urls });
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            showToast('error', err.message);
        }
    }

    useEffect(() => {
        getUserUrls()
    }, [page, rowsPerPage])

    const handleCopy = (short) => {
        navigator.clipboard.writeText(`https://url-shortner-fsd.onrender.com/${short}`);
        showToast('success', 'Url copied to clipboard');
    }
    return (
        <>
            <Navbar />
            <Container maxWidth='lg' className='mt-10'>
                <h1 className='font-[900] text-[30px]'>My Urls</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{
                                    width: '350px'
                                }}>Short Url</TableCell>
                                <TableCell align="left" sx={{
                                    width: '400px'
                                }}>
                                    <div style={{
                                        width: '400px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block'
                                    }}>
                                        Original Url
                                    </div>
                                </TableCell>
                                <TableCell align='center'>Clicks</TableCell>
                                <TableCell align='center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <TableRow colSpan={4}> <TableCell align="center" colSpan={4}><CircularProgress /></TableCell></TableRow> } { (!loading && urls.data.length === 0) ? (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" colSpan={4} >
                                        No Records Exists
                                    </TableCell>
                                </TableRow>
                            ) :
                                urls.data.map((row) => (
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" sx={{
                                            width: '350px'
                                        }}>https://url-shortner-fsd.onrender.com/{row.shortUrl}</TableCell>
                                        <TableCell align="left" sx={{
                                            width: '400px'
                                        }}>
                                            <div style={{
                                                width: '400px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                display: 'block'
                                            }}>
                                                <Tooltip placement='bottom-start' title={row.url}>{row.url}</Tooltip>
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>{row.clicks}</TableCell>
                                        <TableCell align='center'><Tooltip title={'Copy'}><ContentPaste onClick={() => handleCopy(row.shortUrl)} className='cursor-pointer' /></Tooltip></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 30]}
                        component="div"
                        count={urls.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

            </Container>
            {Toast}
        </>
    )
}
