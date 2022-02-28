import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { useNavigate } from "react-router-dom";


const UserBlogs = (props) => {
    const { name, token } = props.user.user
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/api/posts', { headers: { "Authorization": `Bearer ${token}` } })
            .then((resp) => {
                console.log(resp.data)
                setPosts(resp.data)

            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [token])


    // console.log(formatDistance(format(new Date(), 'yyyy, MM, dd, hh, mm, ss'), format(new Date(2022-02-13), 'yyyy, MM, dd, hh, mm, ss')))
    return (
        <>
            <Box>

                {loading ? <Box display='flex' justifyContent='center' width='100%'> <CircularProgress /> </Box> : (
                    <>
                        <Box display='flex' flexDirection='row' justifyContent='space-around' width="100%" flexWrap='wrap'>
                            {posts.length > 0 ? posts.map((e) => (
                                <>
                                    <Box key={e._id}  bgcolor='ghostwhite' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" ,cursor:'pointer'}} p={2} my={1} width="30%" height='200px' onClick={() => navigate(`/homepage/${e._id}`)} >
                                        <Box display='flex' justifyContent='space-between'>
                                            <Box fontSize={25} fontWeight={600} my={2}>{e.title}</Box>
                                            <Box fontSize={12} fontWeight={300} color='green'>{formatDistance(
                                                new Date(),
                                                new Date(e.updatedAt),
                                                { includeSeconds: true }
                                            )} ago</Box>
                                        </Box>
                                        <Box fontSize={15} fontWeight={300} textAlign='justify'>{e.description.slice(0, 300) + (e.description.length > 300 ? "... Read More" : "")} </Box>
                                    </Box>
                                </>

                            )) : <Box display='flex' justifyContent='center' fontSize={30} fontWeight={600}>You haven't created any Posts</Box>}
                        </Box>

                    </>
                )}
            </Box>
        </>
    )
}

export default UserBlogs


//box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
// box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;