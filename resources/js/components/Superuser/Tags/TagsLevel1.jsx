import React from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 1, editable: true },
    { field: 'update',headerName: '-', flex: 1, 
    renderCell: (params) => {
        return <Button variant="contained">Update</Button>;
      }},
];

const rows = [
    { id: 1, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 2, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 3, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 4, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 5, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 6, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 7, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 8, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 9, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
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