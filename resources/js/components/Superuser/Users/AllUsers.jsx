import React from "react";
import { Grid, Typography } from "@mui/material";
import MainLayout from "../BaseLayout";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'organization',headerName: 'Organization', flex: 1},
    { field: 'joined',headerName: 'Joined', flex: 1},
];

const rows = [
    { id: 1, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 2, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 3, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 4, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31'},
    { id: 5, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 6, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 7, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 8, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
    { id: 9, name: 'Lewis Hamilton', email: 'lewis@mercedesamg.com', type: 'Org Member', organization: 'Mercedes AMG', joined: '2023-03-31' },
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
                className="basic-table"
            />
        </Box>
    )
}

export default Datatable