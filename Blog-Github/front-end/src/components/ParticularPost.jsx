import React, { useEffect, useState, useRef } from 'react'
import { Button, CircularProgress, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { format, formatDistance } from 'date-fns'
import { Link, useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import Avatar from 'react-avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';




const ParticularPost = (props) => {
    const { _id, name, token, email } = props.user
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState()
    const { id } = useParams()
    const [comment, setComment] = useState("")
    console.log("Post ID ::", id)
    console.log("Post ::", post)
    const navigate = useNavigate()
    const [content, setContent] = useState();
    const textInput = React.useRef(null);

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


    const addComment = async () => {
        await axios.post(`http://localhost:5000/api/posts/comment-post/${id}`,
            {
                userId: _id,
                comment: comment,
                name: name
            },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Comment Added')
                    loadPost()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
        textInput.current.value = ""
    }

    const savePost = async (e) => {
        // setLoading(true)
        console.log(e)
        await axios.post(`http://localhost:5000/api/posts/save-post/${e}`, { userId: _id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                if (resp) {
                    console.log('Post saved')
                    loadPost()
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
                    loadPost()
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
                    loadPost()
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
                    loadPost()
                }
            }).catch((error) => {
                console.error(error)
                alert(error)

            }).finally(() => setLoading(false))
    }

    const loadPost = async () => {
        setLoading(true)
        axios.post('http://localhost:5000/api/posts/specific-post', {
            postId: id,
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                console.log(resp.data)
                setPost(resp.data)
                setContent(resp.data.description)
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(async () => {
        await loadPost()
    }, [id])

    const logout = () => {
        localStorage.removeItem('user')
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    // const handleScroll = (id, event) => {
    //     event.preventDefault();
    //     const item = findDOMNode(textInput);
    //     window.scrollTo(item.offsetTop);
    // }

    return (
        <>
            {/* Header */}
            <Box width='100%' height='80px' display='flex' bgcolor="white" alignItems='center' justifyContent='space-between' style={{ position: 'fixed', top: 0, zIndex: 2, boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >
                <Box style={{ fontWeight: 'bold', fontSize: '1.6rem' }} mx={5} color='orangered' onClick={() => navigate('/homepage')}>Blogs Stacks</Box>
                <TextField
                    placeholder='Search Content'
                    sx={{ width: 700 }}
                    size='small'
                // onChange={(e) => setSearchedPost(e.target.value)}
                />
                <Box mx={2} justifyContent='flex-end'>
                    <Box fontSize={25} fontWeight={200} onClick={handleClickOpen}><Avatar name={name} size='50' round style={{ marginRight: ".3rem" }} /></Box>
                </Box>
            </Box>
            <Box style={{ position: 'absolute', top: 80, zIndex: 1, }} width='100%' bgcolor='lightgoldenrodyellow' >
                {loading ? <Box display='flex' justifyContent='center' height='100vh' alignItems='center' width='100%'> <CircularProgress size='100px' /> </Box> : (
                    <>
                        {post ?
                            <Box display='flex' flexDirection='row' justifyContent='space-around'  >
                                <Box bgcolor='white' width='7%' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} borderRadius={5} p={2} my={3} mx={1} height='30vh' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' >
                                    <Box>
                                        {post.likes.includes(_id) ?
                                            <IconButton color='default' size='small' >
                                                <FavoriteIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        removeLikedPost(post._id)
                                                    }} style={{ fontSize: '2rem' }} color='error'></FavoriteIcon >
                                            </IconButton> :
                                            <IconButton color='default' size='small' >
                                                <FavoriteBorderIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        likePost(post._id)
                                                    }} style={{ fontSize: '2rem' }} color="disabled"></FavoriteBorderIcon >
                                            </IconButton>}
                                        <span >{post.likes.length}</span>
                                    </Box>
                                    <Box>
                                        {post.saved.includes(_id) ?
                                            <IconButton color='default' size='small' >
                                                <BookmarkIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        removeSavedPost(post._id)
                                                    }} style={{ fontSize: '2rem' }} color='primary'></BookmarkIcon >
                                            </IconButton> :
                                            <IconButton color='default' size='small' >
                                                <BookmarkBorderIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        savePost(post._id)
                                                    }} style={{ fontSize: '2rem' }} color='disabled'></BookmarkBorderIcon >
                                            </IconButton>}
                                        {post.saved.length}
                                    </Box>
                                    <Box>
                                        <Link to="#outlined-required">
                                            <IconButton color='default' size='small' >
                                                <CommentIcon
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        // handleScroll("textInput")
                                                    }} style={{ fontSize: '2rem' }}></CommentIcon >
                                            </IconButton>
                                            <span> {post.comments.length}</span>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box bgcolor='white' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} borderRadius={5} p={4} my={3} mx={1} minHeight='90vh' >
                                    <Box fontSize={12} fontWeight={300} color='green'>{formatDistance(
                                        new Date(),
                                        new Date(post.createdAt),
                                        { includeSeconds: true }
                                    )} ago</Box>
                                    <Box fontSize={30} fontWeight={600} my={2}>{post.title}</Box>
                                    <Box fontWeight={700} mx={1}><Avatar name={post.userName} size={20} round /> {post.userName}</Box>
                                    <Box fontSize={12} mx={4} color='indigo'> {format(new Date(post.createdAt), "MMM dd, yyyy hh:mm a ")}</Box>
                                    <Box dangerouslySetInnerHTML={createMarkup(content)} textAlign='justify' letterSpacing={.5} lineHeight={1.9}></Box>
                                </Box>
                                <Box bgcolor='white' width='10%' display='flex' flexDirection='column' alignItems='center' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} borderRadius={5} p={4} my={3} mx={1} height='50vh'>
                                    <Box fontWeight='700'>About Author</Box>

                                </Box>
                            </Box>
                            : <Box display='flex' height='100vh' flexDirection='row' justifyContent='center' alignItems='center' color='crimson' fontSize={20}  >Post either Deleted or Invalid</Box>}
                    </>
                )}
                {post ?
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
                        <Box my={1} bgcolor='white' borderRadius={4} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>
                            <TextField
                                required
                                variant='standard'
                                multiline
                                minRows={5}
                                maxRows={5}
                                inputRef={textInput}
                                id="outlined-required"
                                placeholder="Write Comments"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                style={{ width: '700px', padding: 15 }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                        <Button variant='standard' onClick={addComment} disabled={comment === '' ? true : false} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", backgroundColor: 'lightgreen' }} >Add Comment</Button>
                        <Box width='700px' my={3}>
                            {post.comments.map((c) => (
                                <>
                                    <Box bgcolor='white' margin={1} padding={2} borderRadius={1} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >
                                        <Box fontSize={15} fontWeight={600} color="green"> {c.name ? c.name : `User(${c.userId.substr(0, 5)})`}</Box>
                                        <Box fontSize={12} fontWeight={400} > {c.comment}</Box>
                                    </Box>
                                </>
                            ))}
                        </Box>
                    </Box>
                    : null}
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
                            <Avatar name={name} size='90' round textSizeRatio={3} />
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

export default ParticularPost