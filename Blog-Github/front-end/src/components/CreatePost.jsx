import React, { useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const CreatePost = (props) => {

    const navigate = useNavigate()
    const { name, email, token } = props.user
    const [title, setTitle] = useState()
    const [postOwner, setPostOwner] = useState(name)
    const [description, setDescription] = useState()
    const [selectedPostType, setSelectedPostType] = useState('public')
    const [loading, setLoading] = useState(false)

    const addPost = () => {
        axios.post('http://localhost:5000/api/posts/user-post', {
            title: title,
            description: description,
            postType: selectedPostType,
            userName: postOwner,
        }, { headers: { "Authorization": `Bearer ${token}` } }).then((resp) => {
            if (resp) {
                console.log('Post Added')
                alert('Post SuccessFully  Created !!!')
                navigate('/homepage')
            }
        }).catch((error) => {
            console.error(error)
            alert(error)

        })
    }

    return (
        <>
            <Box display='flex' width='100%' height='100vh' justifyContent='center' alignItems='center' flexDirection='column'>
                <Box my={1} style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'GrayText' }}>Create Post</Box>
                <Box width='700px' display='flex' flexDirection='row' justifyContent='space-between' my={1}>
                    <Box>
                        <TextField
                            id="outlined-required"
                            label="Post Owner"
                            defaultValue={name}
                            style={{ width: '340px' }}
                            onChange={(e) => setPostOwner(e.target.value || name)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            select
                            required
                            label="Post Type"
                            style={{ width: '340px' }}
                            value={selectedPostType}
                            onChange={(e) => setSelectedPostType(e.target.value)}
                        >
                            <MenuItem value={'public'}>Public</MenuItem>
                            <MenuItem value={'private'}>Private</MenuItem>
                        </TextField>
                    </Box>
                </Box>
                <Box my={1}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        style={{ width: '700px' }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box my={1}>
                    <TextField
                        required
                        multiline
                        minRows={10}
                        maxRows={10}
                        id="outlined-required"
                        label="Description"
                        style={{ width: '700px' }}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Box my={2} display='flex' justifyContent='center'>
                        <Button variant='contained' color='warning' disabled={!title || !description ? true : false} onClick={addPost}> {loading && <CircularProgress size='small' />}Add Post</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CreatePost