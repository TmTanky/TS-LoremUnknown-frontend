import {FC, useState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core'

const Try: FC = () => {

    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
    });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <form>
            <FormControlLabel
                control={
                <Switch
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                }
                label="Primary"
            />
            <Button onClick={() => {
                console.log(state.checkedB)
            }} > Check </Button>
        </form>
    )
}

export default Try