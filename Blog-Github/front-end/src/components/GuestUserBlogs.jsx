import React, { useEffect, useState } from 'react'
import { CircularProgress, IconButton, Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { formatDistance, format } from 'date-fns'
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Avatar from 'react-avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const GuestUserBlogs = (props) => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
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



    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/api/posts')
            .then((resp) => {
                console.log(resp.data)
                let sortedPost = resp.data.sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)))
                setPosts(sortedPost)

            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [])


    // console.log(formatDistance(format(new Date(), 'yyyy, MM, dd, hh, mm, ss'), format(new Date(2022-02-13), 'yyyy, MM, dd, hh, mm, ss')))
    return (
        <>
            <Box >
                {loading ? <Box height='60vh' width='100vw' display='flex' flexDirection='row' justifyContent='center' alignItems='center'> <CircularProgress /> </Box> : (
                    <>
                        <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' mx={5}>
                            {posts.length > 0 ? posts.map((e) => (
                                <>
                                    <Box key={e._id} bgcolor='white' borderRadius={2} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", cursor: 'pointer' }} p={2} mx={2} my={1} width='100%' height='150px' onClick={() => navigate(`/guest-homepage/${e._id}`)} >
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
                                            )} ago </Box>
                                        </Box>
                                        <Box display='flex' justifyContent='space-between' height='60%'>
                                            <Box fontSize={25} fontWeight={600}
                                                onMouseEnter={(e) => { e.target.style.color = 'indigo' }}
                                                onMouseLeave={(e) => { e.target.style.color = 'black' }} >{e.title}
                                            </Box>

                                        </Box>

                                        <Box display='flex' flexDirection='row' justifyContent='center' width='100%' alignItems='flex-start' height='20%'  >
                                            <Box>
                                                <IconButton color='default' size='small' >
                                                    <FavoriteBorderIcon
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            // likePost(e._id)
                                                            handleClickOpen()
                                                        }} style={{ fontSize: '1.2rem' }} color="disabled"></FavoriteBorderIcon >
                                                </IconButton>
                                                <span style={{ fontSize: '.8rem' }}>{e.likes.length} Likes</span>
                                            </Box>
                                            <Box mx={5}>
                                                <IconButton color='default' size='small' >
                                                    <CommentIcon
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            // navigate(`/homepage/${e._id}`)
                                                            // handleClickOpen()
                                                        }} style={{ fontSize: '1.2rem' }}></CommentIcon >
                                                </IconButton>
                                                <span style={{ fontSize: '.8rem' }}> {e.comments.length} Comments</span>
                                            </Box>
                                            <Box>
                                                <IconButton color='default' size='small' >
                                                    <BookmarkBorderIcon
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            // savePost(e._id)
                                                            handleClickOpen()
                                                        }} style={{ fontSize: '1.2rem' }} color='disabled'></BookmarkBorderIcon >
                                                </IconButton>
                                                {e.saved.length}
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            )) : <Box display='flex' justifyContent='center' fontSize={30} fontWeight={600}>No Post Available  <span onClick={() => navigate('/create_post')}>  Create One</span></Box>}
                        </Box>
                    </>
                )}
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
                        You must be logged in to perform this action
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

export default GuestUserBlogs


//box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
// box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
//<Box fontSize={15} fontWeight={300} textAlign='justify'>{e.description.slice(0, 300) + (e.description.length > 300 ? "... Read More" : "")} </Box> 