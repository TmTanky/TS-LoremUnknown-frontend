import {ChangeEvent, FC, useRef, useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

// Interfaces
import { Iposts } from '../../interface/interfaces'
import { IRootReducer } from '../../redux/reducers/rootReducer';

import { TextField, Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Slide from '@material-ui/core/Slide';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Components
import CommentsOnPost from '../../components/commentsOnPosts/commentsOnPost'

// CSS
import './postCard.css'

const PostCard: FC<Iposts> = ({_id, content, postedBy, isHidden, comments, likes}) => {

    const comment = useRef<HTMLInputElement | null | undefined | string>("")
    const userToken = useSelector((state: IRootReducer) => state.user.user.token)
    const user = useSelector((state: IRootReducer) => state.user.user.loggedInUser)
    const [trigger, setTrigger] = useState<{appear: boolean}>({
        appear: false
    })
    const [editPostContent, setEditPostContent] = useState<{newContent: string}>({
        newContent: ""
    })
    const [openComments, setOpenComments] = useState(false)
    const [checked, setChecked] = useState(false);
    const [editPostTrigger, setEditPostTrigger] = useState(false)

    useEffect(() => {
        if (openComments) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditPostContent({
            newContent: e.target.value
        })
    };

    const likePost = async (postID: string ) => {
        try {

            const {data} = await axios.post(`https://unknown-lorem-api.herokuapp.com/likedapost/${postID}`, user, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }

        })

        if (data.msg) {
            console.log(data.msg)
        }
            
        } catch (err) {
            console.log(err)
        }
    }

    const deletePost = async (postID: string) => {
        try {

            const {data} = await axios.delete(`https://unknown-lorem-api.herokuapp.com/deletepost/${postID}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            })

            console.log(data.msg)
            
        } catch (err) {
            console.log(err)
        }
    }

    const updatePost = async (postID: string) => {

        const {newContent} = editPostContent
        
        try {
            
            const {data} = await axios.patch(`https://unknown-lorem-api.herokuapp.com/updatepost/${postID}`, {newContent}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }    
            })

            if (data.msg === "Content Updated.") {
                setEditPostTrigger(false)
            }

        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <div className="postcard" >
            {user._id === postedBy._id ? <div className="postsettings">
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(onpopupState) => (
                        <div>
                        <MoreHorizIcon style={{cursor: 'pointer'}} {...bindTrigger(onpopupState)} />
                        <Popover
                            {...bindPopover(onpopupState)}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                        >
                            <Box className="Box" p={2}>
                                <li style={{cursor: 'pointer', margin: '0.5rem 0'}} onClick={() => setEditPostTrigger(true)} > Edit </li>
                                <li style={{cursor: 'pointer', margin: '0.5rem 0'}} onClick={() => {
                                    setChecked(true)
                                } } > Delete </li>
                            </Box>
                        </Popover>
                        </div>
                    )}
                </PopupState>
                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    <div className="bobo" >
                        <form>
                            <h1> Delete post? </h1>
                            <span style={{margin: 'auto'}} > <Button variant="contained" onClick={() => deletePost(_id) } color="secondary" > Delete </Button> <Button variant="contained" onClick={() => setChecked(false)} color="primary" > Cancel </Button> </span>
                        </form>
                    </div>
                </Slide>
            </div> : ""}

            {isHidden ? <h1> Anonymous </h1> : <h1> {postedBy.firstName} {postedBy.lastName} </h1> }

            {!editPostTrigger ? <p> {content} </p> : 
                <form className="editpost">
                    <TextField defaultValue={content} onChange={handleChange} />
                    <span style={{marginTop: '1rem'}}> <Button onClick={ async () => {
                        if (editPostContent.newContent === "") {
                            setEditPostContent({ newContent: content })
                        }
                        updatePost(_id)
                    }} color="secondary" variant="contained" > Done </Button> <Button color="primary" variant="contained" onClick={() => setEditPostTrigger(false)} > Cancel </Button> </span>
                </form>
            }

            <div className="reactsandcomments">
                {likes.filter(item => item._id === user._id).length === 1 ? <FavoriteIcon style={{marginRight: '0.8rem', cursor: 'pointer'}} onClick={() => {
                    likePost(_id)
                }} /> : <FavoriteBorderIcon style={{marginRight: '0.8rem', cursor: 'pointer'}} onClick={() => {
                    likePost(_id)
                }} /> }
                
                <InsertCommentIcon onClick={() => {
                    setTrigger({appear: !trigger.appear})
                }} style={{marginRight: '0.2rem', cursor: 'pointer'}} />
            </div>

            <p className="viewcomments" onClick={() => setOpenComments(true)} style={{fontSize: '0.8rem', textDecoration: 'underline', marginBottom: '0.3rem'}} > View comments </p>

            <CommentsOnPost toggle={setOpenComments} comments={comments} openComments={openComments} />

            <span> <p> Likes {likes.length} </p> <p> Comments {comments.length} </p> </span>
            {trigger.appear ? <form className="commentonpost">
                <TextField placeholder="Write a comment." onChange={e => comment.current = e.target.value} style={{width: '96%', marginTop: '0.5rem'}} />
                <SendIcon onClick={async () => {
                    try {

                        const {data} = await axios.post(`https://unknown-lorem-api.herokuapp.com/commentinpost/${_id}`, {user, comment}, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${userToken}`
                            }
                        })

                        console.log(data)

                        setTrigger({appear: false})
                        
                    } catch (err) {
                        console.log(err)
                    }

                }} style={{marginLeft: '0.5rem', cursor: 'pointer'}} />
            </form> : ""}
        </div>
    )
}

export default PostCard
