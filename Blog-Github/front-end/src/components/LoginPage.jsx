import React, { useState } from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const LoginPage = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const loginUser = async () => {
        setLoading(true)
        axios.post('http://localhost:5000/api/users/login', {
            email: email,
            password: password,
        }).then((resp) => {
            console.log(resp.data)
            if (resp) {
                 localStorage.setItem('user', JSON.stringify(resp.data))
            }
        }).then(() => {
            setLoading(true)
             navigate('/Homepage')
            window.location.reload()
        }).catch((error) => console.error(error))
    }


    return (
        <>
            <Box display='flex' width='100%' height='100vh' justifyContent='center' alignItems='center' flexDirection='column'>
                <Box my={1} style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'GrayText' }}>Sign in</Box>
                {loading && <CircularProgress color='warning' />}
                <Box my={1}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        style={{ width: '300px' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box my={1}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        type="password"
                        style={{ width: '300px' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box my={2}>
                        <Button variant='contained' color='primary' fullWidth onClick={loginUser}> sign in</Button>
                    </Box>
                    <Box textAlign='center' onClick={() => navigate('/register')} style={{ fontSize: '.8rem', color: 'GrayText', cursor: "pointer" }}>Don't have an account ?</Box>
                </Box>
            </Box>

        </>
    )
}

export default LoginPage