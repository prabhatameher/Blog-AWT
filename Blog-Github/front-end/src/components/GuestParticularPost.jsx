import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { formatDistance, format } from 'date-fns'
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import Avatar from 'react-avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const GuestParticularPost = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState()
    const { id } = useParams()
    const [comment, setComment] = useState("")

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


    const [content, setContent] = useState(`<p>Hello World!</p>`);


    useEffect(() => {
        setLoading(true)
        axios.post('http://localhost:5000/api/posts/specific-post-guest', {
            postId: id,
        })
            .then((resp) => {
                console.log(resp.data)
                setPost(resp.data)
                setContent(resp.data.description)
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [id])

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const addComment = () => {
        //dialog open to Login
    }



    return (
        <>
            <Box width='100%' height='50px' display='flex' bgcolor='white' alignItems='center' justifyContent='space-between' style={{ position: 'fixed', top: 0, zIndex: 2, boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >
                <Box style={{ fontWeight: 'bold', fontSize: '1.6rem', cursor: "pointer" }} mx={5} onClick={() => navigate('/guest-homepage')}>Blogs Stacks</Box>
                <Box mx={2} justifyContent='flex-end'>
                    <Box fontSize={25} fontWeight={200}>Guest User</Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Box fontSize={12} fontWeight={200} style={{ cursor: 'pointer' }}><a href='/login' style={{ textDecoration: 'none' }}>Sign in</a></Box>
                    </Box>
                </Box>
            </Box>
            <Box style={{ position: 'absolute', top: 50, zIndex: 1, }} width='100%' bgcolor='lightgoldenrodyellow' >
                {loading ? <Box display='flex' justifyContent='center' height='100vh' alignItems='center' width='100%'> <CircularProgress size='100px' /> </Box> : (
                    <>
                        {post ?
                            <Box display='flex' flexDirection='row' justifyContent='space-around' >
                                <Box bgcolor='white' width='60%' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} borderRadius={5} p={4} m={2} minHeight='90vh' >
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
                                // inputRef={textInput}
                                id="outlined-required"
                                placeholder="Write Comments"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                style={{ width: '700px', padding: 15 }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                        <Button variant='standard' onClick={handleClickOpen} disabled={comment === '' ? true : false} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", backgroundColor: 'lightgreen' }} >Add Comment</Button>
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
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {/* <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <DialogContentText fontSize={16} fontWeight={700}>
                        You must be logged in to post a comment
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{padding:'1rem'}}>
                    <Button autoFocus onClick={handleClose} color='error'>
                        close
                    </Button>
                    <Button onClick={handleCloseLogin} autoFocus  variant='contained' color='success'>
                        login
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GuestParticularPost