import {FC, useEffect, useState} from 'react'
import axios from 'axios'

// Interfaces
import { Iposts } from '../../interface/interfaces'

// Components
import PostCard from '../../components/postCard/postCard'

// CSS
import './home.css'

const HomePage: FC = () => {

    const [allPost, setAllPost] = useState<{data: Iposts[]}>({
        data: []
    })

    useEffect(() => {
        const getAllPost = async () => {
            const {data} = await axios.get<{data: Iposts[]}>('http://localhost:8000/getallpost')

            setAllPost({
                data: data.data
            })
        }

        getAllPost()

    }, [allPost])

    return (
        <div className="homebox" >
            {allPost.data.map(item => {
                return <div key={item._id} >
                    <PostCard isHidden={item.isHidden} _id={item._id} comments={item.comments} postedBy={item.postedBy} likes={item.likes} content={item.content} />
                </div>
            })}  
        </div>
    )

}

export default HomePage