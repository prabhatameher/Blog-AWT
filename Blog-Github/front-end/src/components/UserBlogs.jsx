import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Button, CircularProgress, IconButton, MenuItem, TextField } from '@mui/material'
import axios from 'axios'
import { format, formatDistance } from 'date-fns'
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Avatar from 'react-avatar'

const UserBlogs = (props) => {
    const { _id, name, token } = props.user.user
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [selectedPostType, setSelectedPostType] = useState('All')
    const [postDetail, setPostdetail] = useState()

    const navigate = useNavigate()

    console.log("PROPS:::", props)

    const deletePost = async (e) => {
        setLoading(true)
        console.log(e)
        await axios.delete(`http://localhost:5000/api/posts/user-post/${e}`, { headers: { "Authorization": `Bearer ${token}` } }).then((resp) => {
            if (resp) {
                console.log('Post Deleted')
                // alert('Post Deleted Successfully !!!')
                loadData()
            }
        }).catch((error) => {
            console.error(error)
            alert(error)

        }).finally(() => setLoading(false))
    }

    const savePost = async (e) => {
        // setLoading(true)
        console.log(e)
        await axios.post(`http://localhost:5000/api/posts/save-post/${e}`, { userId: _id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Post saved')
                    loadData()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
    }

    const removeSavedPost = async (e) => {
        // setLoading(true)
        console.log(e)
        await axios.post(`http://localhost:5000/api/posts/remove-save-post/${e}`, { userId: _id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Post saved')
                    loadData()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
    }

    const likePost = async (e) => {
        // setLoading(true)
        console.log(e)
        await axios.post(`http://localhost:5000/api/posts/like-post/${e}`, { userId: _id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Post Liked')
                    loadData()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
    }

    const removeLikedPost = async (e) => {
        // setLoading(true)
        console.log(e)
        await axios.post(`http://localhost:5000/api/posts/remove-like-post/${e}`, { userId: _id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Post Liked')
                    loadData()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
    }

    const loadData = async () => {
        setLoading(true)
        await axios.get('http://localhost:5000/api/posts/user-post', { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                console.log(resp.data)
                if (selectedPostType === 'Public') {
                    let publicPost = resp.data.filter((p) => p.postType === 'public')
                    // console.log(publicPost)
                    let sortedPost = publicPost.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
                    setPosts(sortedPost)
                } else if (selectedPostType === 'Private') {
                    let privatePost = resp.data.filter((p) => p.postType === 'private')
                    // console.log(privatePost)
                    let sortedPost = privatePost.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
                    setPosts(sortedPost)
                } else if (selectedPostType === 'Saved') {
                    let privatePost = resp.data.filter((p) => p.saved.includes(_id))
                    // let sortedPost = resp.data.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
                    setPosts(privatePost)
                } else {
                    let sortedPost = resp.data.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))

                    setPosts(sortedPost)
                }
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(async () => {
        await loadData()
    }, [token, selectedPostType])

    useEffect(async () => {
        if (props.searchPost !== undefined) {
            let searchPost = posts.filter((p) => p._id == props.searchedPost)
            setPosts(searchPost)
        } else {
            await loadData()
        }
    }, [props.searchedPost])



    // console.log(formatDistance(format(new Date(), 'yyyy, MM, dd, hh, mm, ss'), format(new Date(2022-02-13), 'yyyy, MM, dd, hh, mm, ss')))
    return (
        <>
            <Box>
                <Box style={{ position: 'fixed', top: 120, left: 60, zIndex: 2 }} bgcolor='white' >
                    <TextField
                        select
                        required
                        style={{ width: '100px' }}
                        size='small'
                        value={selectedPostType}
                        onChange={(e) => setSelectedPostType(e.target.value)}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Public'}>Public</MenuItem>
                        <MenuItem value={'Private'}>Private</MenuItem>
                        <MenuItem value={'Saved'}>Saved</MenuItem>
                    </TextField>
                </Box>
                {loading ? <Box height='60vh' width='100vw' display='flex' flexDirection='row' justifyContent='center' alignItems='center'> <CircularProgress /> </Box> : (
                    <>
                        <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' mx={5}>
                            {posts.length > 0 ? posts.map((e) => (
                                <>
                                    <Box key={e._id} bgcolor='white' borderRadius={2} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", cursor: 'pointer' }} p={2} mx={2} my={1} width='100%' height='150px' onClick={() => navigate(`/homepage/${e._id}`)} >
                                        <Box marginBottom={1} fontSize={12} height='20%' display='flex' alignItems='center' justifyContent='space-between'>
                                            <Box display='flex' alignItems='center'>
                                                <Box>
                                                    <Avatar name={e.userName ? e.userName : "Anonymous"} size='40' round style={{ marginRight: ".3rem" }} />
                                                </Box>
                                                <Box>
                                                    <Box>{e.userName ? e.userName : "Anonymous"} </Box>
                                                    <Box> {format(new Date(e.createdAt), "MMM ,dd")} </Box>
                                                </Box>
                                            </Box>
                                            <Box fontSize={12} fontWeight={300} color='green' justifyContent='flex-end'>{formatDistance(
                                                new Date(),
                                                new Date(e.createdAt),
                                                { includeSeconds: true }
                                            )} ago <Box display='flex' justifyContent='flex-end' >{e.user === _id ? <Box> <IconButton color='info' size='small'>
                                                <EditIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        setPostdetail(e);
                                                        navigate(`/update_post/${e._id}`)
                                                    }} style={{ fontSize: '1.2rem' }}
                                                    onMouseEnter={(e) => { e.target.style.scale = '1.5' }}
                                                    onMouseLeave={(e) => { e.target.style.scale = '1' }}> Edit Post </EditIcon>
                                            </IconButton>
                                                <IconButton color='error' size='small' >
                                                    <DeleteIcon
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            deletePost(e._id)
                                                            // navigate('/homeopage')
                                                        }} style={{ fontSize: '1.2rem' }}
                                                        onMouseEnter={(e) => { e.target.style.scale = '1.5' }}
                                                        onMouseLeave={(e) => { e.target.style.scale = '1' }}> Delete Post </DeleteIcon >
                                                </IconButton>
                                            </Box> : null}</Box>
                                            </Box>
                                        </Box>
                                        <Box display='flex' justifyContent='space-between' height='60%'>
                                            <Box fontSize={25} fontWeight={600}
                                                onMouseEnter={(e) => { e.target.style.color = 'indigo' }}
                                                onMouseLeave={(e) => { e.target.style.color = 'black' }} >{e.title}
                                            </Box>

                                        </Box>

                                        <Box display='flex' flexDirection='row' justifyContent='center' width='100%' alignItems='flex-start' height='20%'  >
                                            <Box>
                                                {e.likes.includes(_id) ?
                                                    <IconButton color='default' size='small' >
                                                        <FavoriteIcon
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                removeLikedPost(e._id)
                                                            }} style={{ fontSize: '1.2rem' }} color='error'></FavoriteIcon >
                                                    </IconButton> :
                                                    <IconButton color='default' size='small' >
                                                        <FavoriteBorderIcon
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                likePost(e._id)
                                                            }} style={{ fontSize: '1.2rem' }} color="disabled"></FavoriteBorderIcon >
                                                    </IconButton>}
                                                <span style={{ fontSize: '.8rem' }}>{e.likes.length} Likes</span>
                                            </Box>
                                            <Box mx={5}>
                                                <IconButton color='default' size='small' >
                                                    <CommentIcon
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            navigate(`/homepage/${e._id}`)
                                                        }} style={{ fontSize: '1.2rem' }}></CommentIcon >
                                                </IconButton>
                                                <span style={{ fontSize: '.8rem' }}> {e.comments.length} Comments</span>
                                            </Box>
                                            <Box>
                                                {e.saved.includes(_id) ?
                                                    <IconButton color='default' size='small' >
                                                        <BookmarkIcon
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                removeSavedPost(e._id)
                                                            }} style={{ fontSize: '1.2rem' }} color='primary'></BookmarkIcon >
                                                    </IconButton> :
                                                    <IconButton color='default' size='small' >
                                                        <BookmarkBorderIcon
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                savePost(e._id)
                                                            }} style={{ fontSize: '1.2rem' }} color='disabled'></BookmarkBorderIcon >
                                                    </IconButton>}
                                                {e.saved.length}
                                            </Box>
                                        </Box>

                                    </Box>
                                </>
                            )) : <Box display='flex' justifyContent='center' fontSize={30} fontWeight={600}>No {selectedPostType === "All" ? '' : selectedPostType} Post Available</Box>}
                        </Box>

                    </>
                )}
            </Box>
        </>
    )
}

export default UserBlogs



//  <Box fontSize={15} fontWeight={300} textAlign='justify'>{e.description.slice(0, 300) + (e.description.length > 300 ? "... Read More" : "")} </Box> 
