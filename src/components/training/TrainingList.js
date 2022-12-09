import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { API_URL_TRAININGCUSTOMER } from "../../Constants";
function TrainingList() {
    //State for trainings
    const [trainings, setTrainings] = useState([]);
    //Column apis for quick filtering
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    //Defining columns to display customer data
    const [columnDefs] = useState([

        {
            field: "actions",
            cellRenderer: params => <div>

                <IconButton aria-label="delete" size="medium" onClick={() => deleteItem(params.data)} >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </div>
        },

        { field: "activity", sortable: true, filter: true, width: 200 },
        { field: "date", sortable: true, filter: true },
        { field: "duration", sortable: true, filter: true },
        {
            field: "customer", sortable: true, filter: true,
            cellRenderer: (params) => <div>{params.value.firstname} {params.value.lastname}</div>
        }
    ]
    );

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }

    //function for fetching data
    const getData = (fetchUrl) => {
        fetch(fetchUrl)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert("Something went wrong when fetching the data");
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }
    //Fetch customers on load
    useEffect(() => {
        getData(API_URL_TRAININGCUSTOMER);

    }, []);
    const deleteItem = (data) => {
        if (window.confirm("Are you sure you want to delete training: " + data.activity + " for customer " + data.customer.lastname + "?")) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + data.id, { method: "DELETE" })
                .then(response => {
                    if (response.ok)
                        getData(API_URL_TRAININGCUSTOMER);
                    else
                        alert("Something went wrong")
                })
                .catch(err => console.error(err))
        }
    }
    return (
        <div className="ag-theme-material" style={{ height: 650, width: "90%", margin: "auto" }}>
            <div className="header" style={{ display: "flex", justifyContent: "space-between", marginTop: 50 }}>
                <h1 style={{ margin: 0 }}>TrainingList</h1>
                <TextField id="standard-basic"
                    variant="standard"
                    placeholder="search trainings"
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
            <AgGridReact
                onGridReady={onGridReady}
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                groupHeaderHeight={75}
            />
        </div>
    );
}

export default TrainingList;
