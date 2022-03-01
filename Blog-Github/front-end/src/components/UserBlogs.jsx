import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Button, CircularProgress, IconButton, MenuItem, TextField } from '@mui/material'
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { useNavigate } from "react-router-dom";
import UpdatePost from './UpdatePost'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserBlogs = (props) => {
    const { _id, name, token } = props.user.user
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [selectedPostType, setSelectedPostType] = useState('All')
    const [postDetail, setPostdetail] = useState()

    const navigate = useNavigate()


    const deletePost = async (e) => {
        console.log(e)
        await axios.delete(`http://localhost:5000/api/posts/user-post/${e}`, { headers: { "Authorization": `Bearer ${token}` } }).then((resp) => {
            if (resp) {
                console.log('Post Deleted')
                alert('Post Deleted Successfully !!!')
                navigate('/homepage')
            }
        }).catch((error) => {
            console.error(error)
            alert(error)

        })
    }


    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/api/posts/user-post', { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                console.log(resp.data)
                if (selectedPostType === 'public') {
                    let publicPost = resp.data.filter((p) => p.postType === 'public')
                    // console.log(publicPost)
                    let sortedPost = publicPost.sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)))
                    setPosts(sortedPost)
                } else if (selectedPostType === 'private') {
                    let privatePost = resp.data.filter((p) => p.postType === 'private')
                    // console.log(privatePost)
                    let sortedPost = privatePost.sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)))
                    setPosts(sortedPost)
                } else {
                    
                    let sortedPost = resp.data.sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)))

                    setPosts(sortedPost)
                }

            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [token, selectedPostType])


    // console.log(formatDistance(format(new Date(), 'yyyy, MM, dd, hh, mm, ss'), format(new Date(2022-02-13), 'yyyy, MM, dd, hh, mm, ss')))
    return (
        <>
            <Box>
                <Box mx={2}>
                    <TextField
                        select
                        required
                        // style={{ width: '100px' }}
                        value={selectedPostType}
                        onChange={(e) => setSelectedPostType(e.target.value)}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'public'}>Public</MenuItem>
                        <MenuItem value={'private'}>Private</MenuItem>
                    </TextField>
                </Box>
                {loading ? <Box height='60vh' width='100vw' display='flex' flexDirection='row' justifyContent='center' alignItems='center'> <CircularProgress /> </Box> : (
                    <>
                        <Box display='flex' flexDirection='row' justifyContent='space-around' flexWrap='wrap'>
                            {posts.length > 0 ? posts.map((e) => (
                                <>
                                    <Box key={e._id} bgcolor='ghostwhite' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", cursor: 'pointer' }} p={2} my={1} width="30%" height='250px' onClick={() => navigate(`/homepage/${e._id}`)} >
                                        <Box display='flex' justifyContent='flex-end' >{e.user === _id ? <Box> <IconButton color='info' size='small'> <EditIcon
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                setPostdetail(e);
                                                navigate(`/update_post/${e._id}`)
                                            }}> Edit Post </EditIcon></IconButton>
                                            <IconButton color='error' size='small'> <DeleteIcon
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    deletePost(e._id)
                                                    // navigate('/homeopage')
                                                }}> Edit Post </DeleteIcon></IconButton> </Box> : null}</Box>
                                        <Box display='flex' justifyContent='space-between'>
                                            <Box fontSize={25} fontWeight={600}>{e.title}</Box>
                                            <Box fontSize={12} fontWeight={300} color='green'>{formatDistance(
                                                new Date(),
                                                new Date(e.updatedAt),
                                                { includeSeconds: true }
                                            )} ago</Box>
                                        </Box>
                                        <Box marginBottom={1} fontSize={12}>by : {e.userName ? e.userName : "Anonymous"}</Box>
                                        <Box fontSize={15} fontWeight={300} textAlign='justify'>{e.description.slice(0, 300) + (e.description.length > 300 ? "... Read More" : "")} </Box>
                                    </Box>
                                </>

                            )) : <Box display='flex' justifyContent='center' fontSize={30} fontWeight={600}>No Post Available  <span onClick={() => navigate('/create_post')}>  Create One</span></Box>}
                        </Box>

                    </>
                )}
            </Box>
            {/* <Box hidden>{postDetail && <UpdatePost user={props.user} postDetail={postDetail} />}</Box> */}
        </>
    )
}

export default UserBlogs


//box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
// box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;