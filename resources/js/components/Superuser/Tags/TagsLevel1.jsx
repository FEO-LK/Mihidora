import React from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    {
        field: 'weight', headerName: 'Weight', flex: 1,
        renderCell: (params) => {
            return <TextField id="outlined-basic" variant="outlined" size="small" type="number" InputProps={{ inputProps: { min: 0 } }} />;
        }
    },
    {
        field: 'update', headerName: '', flex: 1,
        renderCell: (params) => {
            return <Button className="update-button">Update</Button>;
        }
    },
];

const rows = [
    { id: 1, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 2, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 3, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 4, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
];

function Datatable() {

    return (
        <Box>
            <DataGrid
                rows={rows}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </Box>
    )
}

export default Datatable