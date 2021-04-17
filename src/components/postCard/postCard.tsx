import {FC, useRef, useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

// Interfaces
import { Iposts } from '../../interface/interfaces'
import { IRootReducer } from '../../redux/reducers/rootReducer';

import { TextField } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SendIcon from '@material-ui/icons/Send';

// CSS
import './postCard.css'

const PostCard: FC<Iposts> = ({_id, content, postedBy, isHidden, comments, likes}) => {

    const comment = useRef<HTMLInputElement | null | undefined | string>("")
    const userToken = useSelector((state: IRootReducer) => state.user.user.token)
    const user = useSelector((state: IRootReducer) => state.user.user.loggedInUser)
    const [trigger, setTrigger] = useState<{appear: boolean}>({
        appear: false
    })

    const likePost = async (postID: string ) => {
        try {

            const {data} = await axios.post(`http://localhost:8000/likedapost/${postID}`, user, {
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



    return (
        <div className="postcard" >
            {isHidden ? <h1> Anonymous </h1> : <h1> {postedBy.firstName} {postedBy.lastName} </h1> }
            <p> {content} </p>
            <div className="reactsandcomments">
                <FavoriteIcon style={{marginRight: '0.8rem'}} onClick={() => {
                    likePost(_id)
                }} /> 
                <InsertCommentIcon onClick={() => {
                    setTrigger({appear: !trigger.appear})
                }} style={{marginRight: '0.2rem'}} />
            </div>
            <span> <p> Likes {likes.length} </p> <p> Comments {comments.length} </p> </span>
            {trigger.appear ? <form className="commenonpost">
                <TextField placeholder="Write a comment." onChange={e => comment.current = e.target.value} style={{width: '96%', marginTop: '0.5rem'}} />
                <SendIcon onClick={async () => {
                    try {

                        const {data} = await axios.post(`http://localhost:8000/commentinpost/${_id}`, {user, comment}, {
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
                    // comment.current = ""
                }} style={{marginLeft: '0.5rem'}} />
            </form> : ""}
        </div>
    )
}

export default PostCard
