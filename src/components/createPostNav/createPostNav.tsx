import {FC, useState, ChangeEvent} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

import { TextareaAutosize, Button, Switch } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// CSS
import './createPostNav.css'
import { IRootReducer } from '../../redux/reducers/rootReducer'

const CreatePostNav: FC = () => {

    const [checkState, setCheckState] = useState<{checkedA: boolean}>({
        checkedA: false
    })
    
    const userToken = useSelector((state: IRootReducer) => state.user.user.token)
    const userID = useSelector((state: IRootReducer) => state.user.user.loggedInUser)

    const [open, setOpen] = useState<boolean>(false)
    const [createPost, setCreatePost] = useState<{content: string, isHidden: boolean}>({
        content: "",
        isHidden: checkState.checkedA
    })
    const [createPostError, setCreatePostError] = useState<{errors: string[]}>({
        errors: []
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckState({ ...checkState, [e.target.name]: e.target.checked });
    }

    const createNewPost = async () => {
        try {

            const {data} = await axios.post(`http://localhost:8000/createpost/${userID._id}`, {createPost}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }

        })

        if (data.msg) {
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

                <TextareaAutosize value={createPost.content} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCreatePost({content: e.target.value, isHidden: checkState.checkedA})} className="createpost" rowsMin={3} />
                <span> <Switch
                    checked={checkState.checkedA}
                    onChange={handleChange}
                    value={checkState}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /> Show Name </span>
                <Button onClick={() => {
                    
                    createNewPost()
                }} style={{marginTop: '0.5rem'}} color="secondary" variant="contained" > Post </Button>
            </form>
        </nav>
    )

}

export default CreatePostNav