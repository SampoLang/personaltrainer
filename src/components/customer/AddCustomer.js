import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
export default function AddCustomer(props) {
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
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
        let emptyState = {}
        //empties the state
        for (const key in customer) {

            emptyState = { ...emptyState, [key]: "" }
        }
        setCustomer(emptyState);
    }

    return (
        <div className="addDialog">
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
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
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}