import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from "react-router-dom";
import UserBlogs from './UserBlogs';


const HomePage = (props) => {

    const { name, email } = props.user
    const navigate = useNavigate()

    // console.log('Rendering Home Page...')
    const logout = () => {
        localStorage.removeItem('user')
        // window.reload()
    }
    return (
        <>
            {/* Header */}
            <Box width='100%' height='80px' bgcolor='yellow' display='flex' alignItems='center' justifyContent='space-between' style={{ position: 'fixed', top: 0, zIndex: 2 }} >
                <Box style={{ fontWeight: 'bold', fontSize: '1.6rem' }} mx={5}>Blogs Stacks</Box>
                <Box mx={2} justifyContent='flex-end'>
                    <Box fontSize={25} fontWeight={200}>Welcome {name}</Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Box fontSize={12} fontWeight={200} mx={1}>{email} </Box>
                        <Box fontSize={12} fontWeight={200} onClick={logout} style={{ cursor: 'pointer' }}><a href='/login' style={{ textDecoration: 'none' }}>Logout</a></Box>
                    </Box>
                </Box>
            </Box>

            {/* Content */}

            <Box width='100%' display='flex' justifyContent='flex-end' marginTop={10}>
                <Box m={2} style={{ position: 'fixed', top: 80, zIndex: 2 }}>
                    <Button variant='contained' size='small' color='success' onClick={() => navigate('/create_post')}>+ Create Post</Button>
                </Box>
            </Box>
            <Box style={{ position: 'absolute', top: 120, zIndex: 1 }}>
                <UserBlogs user={props} />
            </Box>
        </>
    )
}

export default HomePage