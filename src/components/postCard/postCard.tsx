import {FC} from 'react'
import { Iposts } from '../../interface/interfaces'

const PostCard: FC<Iposts> = ({_id, content, postedBy}) => {
    return (
        <div>
            <h1> {postedBy.firstName} {postedBy.lastName} </h1>
            <p> {content} </p>
        </div>
    )
}

export default PostCard