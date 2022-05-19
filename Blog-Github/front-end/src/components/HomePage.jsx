import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import UserBlogs from './UserBlogs';
import Avatar from 'react-avatar'
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';




const HomePage = (props) => {

    const { name, email, token } = props.user
    const [loading, setLoading] = useState(false)
    const [searchedPost, setSearchedPost] = useState()
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseLogin = () => {
        localStorage.removeItem('user')
        setOpen(false);
    };

    // console.log('Rendering Home Page...')
    const logout = () => {
        localStorage.removeItem('user')
        // window.reload()
    }

    return (
        <>
            {/* Header */}
            <Box width='100%' height='80px' display='flex' bgcolor="white" alignItems='center' justifyContent='space-between' style={{ position: 'fixed', top: 0, zIndex: 2, boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >
                <Box style={{ fontWeight: 'bold', fontSize: '1.6rem' }} mx={5} color='orangered'>Blogs Stacks</Box>
                <TextField
                    placeholder='Search Content'
                    sx={{ width: 700 }}
                    size='small'
                    onChange={(e) => setSearchedPost(e.target.value)}
                />
                <Box mx={2} justifyContent='flex-end'>
                    <Box fontSize={25} fontWeight={200} onClick={handleClickOpen}><Avatar name={name} size='50' color='red' round style={{ marginRight: ".3rem" }} /></Box>
                    {/* <Box fontSize={12} fontWeight={200} onClick={logout} style={{ cursor: 'pointer' }}><a href='/guest-homepage' style={{ textDecoration: 'none' }}>Logout</a></Box> */}
                </Box>
            </Box>

            {/* Content */}

            <Box width='100%' display='flex' justifyContent='flex-end' marginTop={10}>
                <Box m={2} style={{ position: 'fixed', top: 80, zIndex: 2, }}>
                    <Button variant='contained' size='small' color='success' onClick={() => navigate('/create_post')}>+ Create Post</Button>
                </Box>
            </Box>
            <Box style={{ position: 'absolute', top: 120, zIndex: 1 }} width='100%' display='flex' justifyContent='center' >
                <UserBlogs user={props} searchedPost={searchedPost} />
            </Box>
            <Dialog
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            // aria-labelledby="responsive-dialog-title"
            >
                <Box height='400px' width='350px' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                    <Box display='flex' flexDirection='column' alignItems='center' my={3}>
                        <Box>
                            <Avatar name={name} size='90' round textSizeRatio={3} color={'red'} />
                        </Box>
                        <Box marginTop={2} fontSize='2rem'>
                            {name.toUpperCase()}
                        </Box>
                        <Box fontSize='.9rem' color='gray'>
                            {email}
                        </Box>
                        <Box fontSize='.9rem' color='gray' my={2} px={1} >
                            <IconButton color='info' size='small'>
                                <EditIcon
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }} style={{ fontSize: '1.2rem' }}> </EditIcon>
                            </IconButton>
                            Edit Profile
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='space-around' >
                        <Box onClick={handleCloseLogin} color='gray' fontSize={12} borderColor="red" borderRadius={1} py={1} px={15} bgcolor="#e8e8e8"><a href='/guest-homepage' style={{ textDecoration: 'none' }}>Logout</a></Box>
                        <Box onClick={handleClose} my={2} color='gray' fontSize={12} borderColor="gray" borderRadius={1} py={1} px={15} bgcolor="#e8e8e8" >Close</Box>
                    </Box>
                </Box>

            </Dialog>
        </>
    )
}

export default HomePage