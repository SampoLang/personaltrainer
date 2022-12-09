import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",

    })
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        })
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        props.updateCustomer(customer, props.data.links[0].href);
        setOpen(false);
    }

    return (
        <div className="addDialog">
            <IconButton aria-label="edit" size="medium" onClick={handleClickOpen}>
                <CreateIcon fontSize="inherit" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editing customer: {customer.firstname + " " + customer.lastname} </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Firstname"
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Streetaddress"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="E-mail"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}