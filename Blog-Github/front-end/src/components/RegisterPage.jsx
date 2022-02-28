import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const RegisterPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const registerUser = async () => {
        axios.post('http://localhost:5000/api/users', {
            name: name,
            email: email,
            password: password,
        }).then((resp) => {
            if(resp){
                console.log('User Created')
                navigate('/login')
            }
        }).catch((error) => console.error(error))
    }


    return (
        <>
            <Box display='flex' width='100%' height='100vh' justifyContent='center' alignItems='center' flexDirection='column'>
                <Box style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'GrayText' }}>Sign Up</Box>
                <Box my={1}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        style={{ width: '300px' }}
                        onChange={(e) => setName(e.target.value)}
                        
                        />
                </Box>
                <Box my={1}>
                    <TextField
                        required
                        defaultValue=''
                        id="outlined-required"
                        label="Email"
                        style={{ width: '300px' }}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        />
                </Box>
                <Box my={1}>
                    <TextField
                        required
                        defaultValue=""
                        id="outlined-required"
                        label="Password"
                        type="password"
                        style={{ width: '300px' }}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <Box my={2}>
                        <Button variant='contained' color='primary' fullWidth onClick={registerUser}>sign up</Button>
                    </Box>
                    <Box textAlign='center' my={1} onClick={() => navigate('/login')} style={{ fontSize: '.8rem', color: 'GrayText', cursor: "pointer" }}>
                        Already have an account ?
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default RegisterPage