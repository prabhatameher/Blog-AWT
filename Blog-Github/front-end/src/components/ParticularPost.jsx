import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { useParams } from "react-router-dom";

const ParticularPost = (props) => {
    const { name, token } = props.user
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState()
    const { id } = useParams()
    console.log("Post ID ::", id)
    console.log("Post ::", post)


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
            <Box>
                {loading ? <Box display='flex' justifyContent='center' height='100vh' alignItems='center' width='100%'> <CircularProgress size='100px' /> </Box> : (
                    <>
                        {post &&
                            <Box display='flex' flexDirection='row' justifyContent='space-around'>
                                <Box bgcolor='ghostwhite' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }} p={2} m={2} minHeight='90vh' >
                                    <Box display='flex' justifyContent='space-between'>
                                        <Box fontSize={30} fontWeight={600} my={2}>{post.title}</Box>
                                        <Box fontSize={12} fontWeight={300} color='green'>{formatDistance(
                                            new Date(),
                                            new Date(post.updatedAt),
                                            { includeSeconds: true }
                                        )} ago</Box>
                                    </Box>
                                    <Box fontSize={15} fontWeight={300} textAlign='justify'>{post.description}</Box>
                                </Box>
                            </Box>
                        }
                    </>
                )}
            </Box>
        </>
    )
}

export default ParticularPost