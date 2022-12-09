import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import moment from 'moment';
export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: ""

    })
    const today = moment();
    const handleClickOpen = () => {
        console.log(props.data)
        setTraining({ ...training, customer: props.data.links[0].href })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(training)
    };
    const handleSave = () => {
        let formattedDate = moment(training.date).format("YYYY-MM-DDTkk:mm:ss.SSS")

        if (formattedDate < today) {
            alert("Insert valid date")
        }
        else {
            setTraining({ ...training, date: formattedDate })
            props.addTraining(training);
            setOpen(false);
            alert("Training added succesfully")
        }

    }

    return (
        <div className="addDialog">
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} size="large">
                <DialogTitle>New training for {props.data.firstname + " " + props.data.lastname}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="date"
                        label="Training date"
                        type="datetime-local"
                        value={training.date}
                        onChange={e =>
                            setTraining({ ...training, date: e.target.value })}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}