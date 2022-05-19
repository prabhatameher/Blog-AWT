import React, { useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import '../App.css'
import DOMPurify from 'dompurify';



const CreatePost = (props) => {

    const navigate = useNavigate()
    const { name, email, token } = props.user
    const [title, setTitle] = useState()
    const [postOwner, setPostOwner] = useState(name)
    const [description, setDescription] = useState()
    const [selectedPostType, setSelectedPostType] = useState('private')
    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState();
    const [editorState, setEditorState] = useState();


    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [convertedContent, setConvertedContent] = useState()

    // const textId = "unique-id"
    const textId = "target-div"

    // console.log(post)

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    console.log("ConvertedContent", convertedContent)

    const addPost = () => {
        axios.post('http://localhost:5000/api/posts/user-post', {
            title: title,
            // description: description,
            description: convertedContent,
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
                            size='small'
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
                            size='small'
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
                        size='small'
                        style={{ width: '700px' }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                {/* <Box my={1}>
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
                </Box> */}
                <Box><Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
                    }}
                    placeholder={('Write here ...')}
                />
                </Box>
                <Box my={2}  display='flex' justifyContent='center'>
                    <Button variant='contained' color='warning' disabled={!title || !convertedContent ? true : false} onClick={addPost}> {loading && <CircularProgress size='small' />}Add Post</Button>
                </Box>
            </Box>
        </>
    )
}

export default CreatePost