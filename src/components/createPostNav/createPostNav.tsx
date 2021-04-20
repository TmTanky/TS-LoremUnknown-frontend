import {FC, useState, ChangeEvent} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

import { TextareaAutosize, Button, Switch } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// CSS
import './createPostNav.css'
import { IRootReducer } from '../../redux/reducers/rootReducer'

const CreatePostNav: FC = () => {
    
    const userToken = useSelector((state: IRootReducer) => state.user.user.token)
    const userID = useSelector((state: IRootReducer) => state.user.user.loggedInUser)

    const [open, setOpen] = useState<boolean>(false)

    const [isHidden, setIsHidden] = useState(false);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHidden(!isHidden)
    };

    const [createPost, setCreatePost] = useState<{content: string}>({
        content: ""
    })
    const [createPostError, setCreatePostError] = useState<{errors: string[]}>({
        errors: []
    })

    const createNewPost = async () => {
        try {

            const {data} = await axios.post(`https://unknown-lorem-api.herokuapp.com/createpost/${userID._id}`, {createPost, isHidden}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
        })

        if (data.msg) {
            console.log(data)
            setCreatePostError({
                errors: [data.msg]
            })
            setOpen(true)
        }
            
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <nav className="nav2">
            <form>
                {createPostError.errors.length > 0 ? createPostError.errors.map(err => {
                        return <Collapse in={open} key={err} style={{marginBottom: '1rem'}} >
                            <Alert severity="warning" action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            >
                            {err}
                        </Alert>
                    </Collapse>
                }): ""}

                <TextareaAutosize value={createPost.content} placeholder="Share something..." onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCreatePost({content: e.target.value })} className="createpost" rowsMin={3} />
                <span> <FormControlLabel
                    control={
                    <Switch
                        checked={isHidden}
                        onChange={handleChange}
                        name="checkedB"
                        color="secondary"
                    />
                    }
                    label="Hide Name"
                /> </span>
                <Button onClick={() => {
                    createNewPost()
                    setCreatePost({
                        content: ""
                    })
                    setCreatePostError({
                        errors: []
                    })
                }} style={{marginTop: '0.5rem'}} color="secondary" variant="contained" > Post </Button>
            </form>
        </nav>
    )

}

export default CreatePostNav