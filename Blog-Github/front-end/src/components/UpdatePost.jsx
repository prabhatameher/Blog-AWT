import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useParams } from "react-router-dom";




const UpdatePost = (props) => {

    console.log(props)
    const navigate = useNavigate()
    const { name, email, token } = props.user
    const [title, setTitle] = useState()
    const [postOwner, setPostOwner] = useState()
    const [description, setDescription] = useState()
    const [selectedPostType, setSelectedPostType] = useState()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [post, setPost] = useState()

    console.log(post)

    const addPost = () => {
        axios.put(`http://localhost:5000/api/posts/user-post/${id}`, {
            title: title,
            description: description,
            postType: selectedPostType,
            userName: postOwner,
        }, { headers: { "Authorization": `Bearer ${token}` } }).then((resp) => {
            if (resp) {
                console.log('Post Updated')
                alert('Post Updated SuccessFully !!!')
                navigate('/homepage')
            }
        }).catch((error) => {
            console.error(error)
            alert(error)

        })
    }

    useEffect(() => {
        setLoading(true)
        axios.post('http://localhost:5000/api/posts/specific-post', {
            postId: id,
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                console.log(resp.data)
                setPost(resp.data)
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [id])

    return (
        <>
            {post ?
                <Box display='flex' width='100%' height='100vh' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Box my={1} style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'GrayText' }}>Update Post</Box>
                    <Box width='700px' display='flex' flexDirection='row' justifyContent='space-between' my={1}>
                        <Box>
                            <TextField
                                id="outlined-required"
                                label="Post Owner"
                                defaultValue={post.userName || name}
                                style={{ width: '340px' }}
                                onChange={(e) => setPostOwner(e.target.value || name)}
                            />
                        </Box>
                        <Box>
                            <TextField
                                select
                                required
                                label="Post Type"
                                defaultValue={post.postType}
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
                            defaultValue={post.title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>

                    <Box my={1}>
                        <TextField
                            required
                            multiline
                            minRows={10}
                            maxRows={10}
                            defaultValue={post.description}
                            id="outlined-required"
                            label="Description"
                            style={{ width: '700px' }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Box my={2} display='flex' justifyContent='center'>
                            <Button variant='contained' color='warning' onClick={addPost}> {loading && <CircularProgress size='small' />}Update Post</Button>
                        </Box>
                    </Box>
                </Box>
                : <Box height='100vh' width='100%' display='flex' flexDirection='row' justifyContent='center' alignItems='center'><CircularProgress /></Box>
            }
        </>
    )
}

export default UpdatePost