import {FC} from 'react'

import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
// import {Button} from '@material-ui/core'

// CSS
import './commentsOnPost.css'
import { Icomments } from '../../interface/interfaces';

const CommentsOnPost: FC<{openComments: boolean, toggle: Function, comments: Icomments[]}> = ({openComments, toggle, comments}) => {

    return (
        <Slide direction="down" in={openComments} mountOnEnter unmountOnExit>
            <div className="commentsect">
                <div className="commentform">
                    <div className="closecommentsect">
                        <CloseIcon style={{cursor: 'pointer'}} onClick={() => toggle(false)} />
                    </div>
                    {comments.map(item => {
                        return <div key={item._id} className="onecomment">
                            <h2> {item.commentBy.username} </h2>
                            <p> {item.comment} </p>
                        </div>
                    })}
                </div>
            </div>
        </Slide>
    )

} 

export default CommentsOnPost