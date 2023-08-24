import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

function Organizations() {

    const columns = [
        { field: 'organization', headerName: 'Organization', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'reg', headerName: 'Registration', flex: 1 },
        { field: 'size', headerName: 'Size', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'joined', headerName: 'Joined', flex: 1 },
    ];

    const rows = [
        { id: 1, organization: 'Organization', type: 'Academia', reg: '123456789', size: '11 - 30',  email: 'organization@feo.lk', phone: '0112938475', joined: '2023-02-23 07:33:22'},
        { id: 2, organization: 'Organization', type: 'Academia', reg: '123456789', size: '11 - 30',  email: 'organization@feo.lk', phone: '0112938475', joined: '2023-02-23 07:33:22'},
    ];

    return (
        <MainLayout>
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
        </MainLayout>
    )
}

export default Organizations;