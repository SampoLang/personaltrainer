
import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { TextField, InputAdornment } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { API_URL_CUSTOMERS, API_URL_TRAININGS } from "../../Constants";
import AddCustomer from "./AddCustomer";
import AddTraining from "../training/AddTraining";
import EditCustomer from "./EditCustomer";
import ExportToCsv from "../ExportToCsv";
function CustomerList() {
    //State for customers
    const [customers, setCustomers] = useState([]);
    //Column apis for quick filtering
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    //Defining columns to display customer data
    const [columnDefs] = useState([
        {
            field: "actions",
            width: 100,
            cellRenderer: params =>
                <div>
                    <IconButton aria-label="delete" size="medium" onClick={() => deleteItem(params.data)} >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
        },
        {
            field: "",
            width: 60,
            cellRenderer: params =>
                <div>
                    <EditCustomer data={params.data} updateCustomer={updateCustomer} />
                </div>
        },
        {
            field: "",
            width: 150,
            cellRenderer: params =>
                <div>
                    <AddTraining data={params.data} addTraining={addTraining} />
                </div>
        },
        { field: "firstname", sortable: true, filter: true, width: 150 },
        { field: "lastname", sortable: true, filter: true, width: 150 },
        { field: "email", sortable: true, filter: true, width: 200 },
        { field: "phone", sortable: true, filter: true, width: 200 },
        { field: "streetaddress", sortable: true, filter: true, width: 200 },
        { field: "city", sortable: true, filter: true, width: 150 },
        { field: "postcode", sortable: true, filter: true, width: 120 }


    ]);
    //function for fetching  customer data
    const getData = (fetchUrl) => {
        fetch(fetchUrl)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert("Something went wrong when fetching the data");
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }
    //Fetch customers on load
    useEffect(() => {
        getData(API_URL_CUSTOMERS)
    }, []);

    //post method for adding customers
    const addCustomer = (customer) => {
        fetch(API_URL_CUSTOMERS, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        }).then(response => {
            if (response.ok)
                getData(API_URL_CUSTOMERS)
            else
                alert("Error when saving new customer")
        }).catch(err => console.error(err))
    }
    //post method for adding new training to a customer
    const addTraining = (training) => {
        fetch(API_URL_TRAININGS, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(training)
        }).then(response => {
            if (response.ok)
                getData(API_URL_CUSTOMERS)
            else
                alert("Error when saving a new trainisng")
        }).catch(err => console.error(err))
    }
    // Edit customer data
    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer)
        }).then(response => {
            if (response.ok)
                getData(API_URL_CUSTOMERS);
            else
                alert("Something went wrong");
        }).catch(err => console.error(err))
    }

    //DELETE CUSTOMER
    const deleteItem = (data) => {
        if (window.confirm("Are you sure you want to delete customer: " + data.firstname + " " + data.lastname + "?")) {
            fetch(data.links[0].href, { method: "DELETE" })
                .then(response => {
                    if (response.ok)
                        getData(API_URL_CUSTOMERS);
                    else
                        alert("Something went wrong")
                })
                .catch(err => console.error(err))
        }
    }

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }

    return (
        <div className="ag-theme-material" style={{ height: 650, width: "95%", margin: "auto" }}>
            <div className="header" style={{ display: "flex", justifyContent: "space-between", marginTop: 50 }}>
                <h1 style={{ margin: 0 }}>CustomerList</h1>
                <TextField id="standard-basic"
                    variant="standard"
                    placeholder="search customers"
                    onChange={onFilterTextChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "right", margin: 10 }}>
                <AddCustomer addCustomer={addCustomer} />
                <ExportToCsv customers={customers} />
            </div>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                groupHeaderHeight={75}
            />
        </div >

    );
}

export default CustomerList;
