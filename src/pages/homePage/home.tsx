import {FC, useEffect, useState} from 'react'
import axios from 'axios'

// Interfaces
import { Iposts } from '../../interface/interfaces'

// Components
import PostCard from '../../components/postCard/postCard'

// CSS
import './home.css'

const HomePage: FC = () => {

    let isMounted = true
    const [allPost, setAllPost] = useState<{data: Iposts[]}>({
        data: []
    })

    useEffect(() => {
        const getAllPost = async () => {
            const {data} = await axios.get<{data: Iposts[]}>('http://localhost:8000/getallpost')

            if (isMounted) {
                setAllPost({
                    data: data.data
                })
            }
        }

        getAllPost()

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => { isMounted = false }
    }, [allPost, isMounted])

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