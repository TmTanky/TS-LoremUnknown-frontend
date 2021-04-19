import {FC} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'

// Interfaces
import { Icomments } from '../../interface/interfaces';
import { IRootReducer } from '../../redux/reducers/rootReducer';

import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';


// CSS
import './commentsOnPost.css'

const CommentsOnPost: FC<{openComments: boolean, toggle: Function, comments: Icomments[]}> = ({openComments, toggle, comments}) => {

    const userToken = useSelector((state: IRootReducer ) => state.user.user.token)
    const userID = useSelector((state: IRootReducer) => state.user.user.loggedInUser)

    const likeComment = async (commentID: string) => {
        
        try {

            const {data} = await axios.patch(`http://localhost:8000/reacttocomment/${commentID}`, userID, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            })

            console.log(data)
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Slide direction="down" in={openComments} mountOnEnter unmountOnExit>
            {comments.length > 0 ? <div className="commentsect">
                <div className="commentform">
                    <div className="closecommentsect">
                        <CloseIcon style={{cursor: 'pointer'}} onClick={() => toggle(false)} />
                    </div>
                    {comments.map(item => {
                        return <div key={item._id} className="onecomment">

                            <div className="commentdetail">
                                <h2> {item.commentBy.username} </h2>
                                <p> {item.comment} </p>
                            </div>

                            <div className="commentreact">
                                <Tooltip title={`${item.commentLikes.length} ${item.commentLikes.length <= 1 ? 'like.' : 'likes.'}`} arrow>
                                    {item.commentLikes.filter(item => {
                                        return item._id === userID._id
                                    }).length === 1 ? <FavoriteIcon onClick={() => likeComment(item._id)} /> : <FavoriteBorderIcon onClick={() => likeComment(item._id)} /> }
                                </Tooltip>               
                            </div>

                        </div>
                    })}
                </div>
            </div> : <div className="commentsect">
                <div className="commentform">
                    <div className="closecommentsect">
                        <CloseIcon style={{cursor: 'pointer'}} onClick={() => toggle(false)} />
                    </div>

                    <h1 style={{textAlign: 'center'}} > No comments </h1>
                </div>
            </div> }
        </Slide>
    )

} 

<h1 style={{textAlign: 'center'}} > No comments </h1>

export default CommentsOnPost