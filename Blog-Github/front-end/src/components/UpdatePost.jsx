import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import '../App.css'
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';




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
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(currentContentAsHTML);

    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    console.log("ConvertedContent", convertedContent)

    const addPost = async (content) => {
        axios.put(`http://localhost:5000/api/posts/user-post/${id}`, {
            title: title,
            // description: content,
            description: convertedContent,
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
                // console.log(resp.data)
                setPost(resp.data)


                let blocksFromHTML = htmlToDraft(resp.data.description);
                let formattedText = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );

                setEditorState(EditorState.createWithContent(formattedText))

                console.log("CONTENT", resp.data.description)
                setContent(resp.data.description)
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [id])

    function uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID 09f7b6880529e2a');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    console.log("Image Upload Response", response)
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    console.log(error)
                    reject(error);
                });
            }
        );
    }


    return (
        <>
            <Box >
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
                                    size='small'
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
                                style={{ width: '700px' }}
                                size='small'
                                defaultValue={post.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Box>
                        {/* <Box>
                            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
                        </Box> */}
                        <Box><Editor
                            editorState={editorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            onEditorStateChange={handleEditorChange}
                            // toolbar={{
                            //     link: { inDropdown: true },
                            //     history: { inDropdown: true },
                            //     image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
                            // }}
                            placeholder={('Write here ...')}
                        />
                        </Box>

                        <Box my={2} display='flex' justifyContent='center'>
                            <Button variant='contained' color='warning' onClick={addPost}> {loading && <CircularProgress size='small' />}Update Post</Button>
                        </Box>
                    </Box>
                    : <Box height='100vh' width='100%' display='flex' flexDirection='row' justifyContent='center' alignItems='center'><CircularProgress /></Box>
                }
            </Box>
        </>
    )
}

export default UpdatePost