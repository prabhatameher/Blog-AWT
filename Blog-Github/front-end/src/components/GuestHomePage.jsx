import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from "react-router-dom";
import GuestUserBlogs from './GuestUserBlogs';
import Avatar from 'react-avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const GuestHomePage = (props) => {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // console.log("Post ID ::", id)
    // console.log("Post ::", post)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseLogin = () => {
        setOpen(false);
        navigate("/login")
    };

    // console.log('Rendering Home Page...')
    const logout = () => {
        localStorage.removeItem('user')
        // window.reload()
    }
    return (
        <>
            {/* Header */}
            <Box width='100%' height='80px' bgcolor='white' display='flex' alignItems='center' justifyContent='space-between' style={{ position: 'fixed', top: 0, zIndex: 2, boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >
                <Box style={{ fontWeight: 'bold', fontSize: '1.6rem', cursor: "pointer" }} mx={5} onClick={() => navigate('/guest-homepage')}>Blogs Stacks</Box>
                <Box mx={2} justifyContent='flex-end'>
                    <Box fontSize={20} fontWeight={200} onClick={handleClickOpen}><Avatar name="G" size='40' round style={{ marginRight: ".3rem" }} /></Box>
                    {/* <Box display='flex' justifyContent='space-between'>
                        <Box fontSize={12} fontWeight={200} onClick={logout} style={{ cursor: 'pointer' }}><a href='/login' style={{ textDecoration: 'none' }}>Sign in</a></Box>
                    </Box> */}
                </Box>
            </Box>

            {/* Content */}

            <Box width='100%' display='flex' justifyContent='flex-end' marginTop={10}  >
                <Box m={2} style={{ position: 'fixed', top: 80, zIndex: 2 }}>
                    <Button variant='contained' size='small' color='success' onClick={() => navigate('/login')}>+ Sign in to Create Post</Button>
                </Box>
            </Box>
            <Box style={{ position: 'absolute', top: 120, zIndex: 1 }} width='100%' display='flex' justifyContent='center'>
                <GuestUserBlogs />
            </Box>
            <Dialog
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                // aria-labelledby="responsive-dialog-title"
                style={{ position: 'absolute', top: '20', right: '50' }}
            >
                <DialogTitle id="responsive-dialog-title">
                <Avatar name="G" size='40' round style={{ marginRight: ".3rem" }} /> Guest
                </DialogTitle>
                <DialogContent >
                    <DialogContentText fontSize={16} fontWeight={700}>
                        {/* <Avatar name="G" size='40' round style={{ marginRight: ".3rem" }} /> Guest
                        <br /> */}
                        You haven't logged in
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ padding: '1rem' }}>
                    <Button autoFocus onClick={handleClose} color='error'>
                        continue with guest
                    </Button>
                    <Button onClick={handleCloseLogin} autoFocus variant='contained' color='success'>
                        go to login page
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GuestHomePage