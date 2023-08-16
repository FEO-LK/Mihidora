import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MainLayout from "../BaseLayout";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'organization',headerName: 'Organization', flex: 1},
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'reg', headerName: 'Registration', flex: 1 },
    { field: 'contact', headerName: 'Contact Person', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'joined',headerName: 'Joined', flex: 1},
];


function OrganizationUsers() {

    const [UserList, setUserList] = useState([
            { id: 1, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
            { id: 2, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
            { id: 3, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
    ]);
    const [Loading, setLoading] = useState([true]);

    const orgTypes = [
        'None',
        'CSO/NGO',
        'Academia',
        'Research Institution',
        'Private sector',
        'Media',
        'Donor'
    ];

      useEffect(() => {
            getAllUsers();
        }, []);

    const getAllUsers = () => {
        axios.get('/api/view-org-users').then(res => {
        if(res.status == 200) {
            setLoading(false);
            console.log(res.data);
            let users = res.data.users.map((user) => {
                return { 
                    id: user.id,
                    organization: user.org_name,
                    type: orgTypes[user.org_type],
                    reg: user.reg_number,
                    contact: user.name,
                    email: user.email,
                    phone: user.contact_number,
                    joined: user.created_at
                 };
            });
            setUserList(users);
            
        }
        });
    }

    const handleCellClick = (e) => {
        console.log(e);
        // row.contact,email,id,joined,organization,phone,reg,type
    }

    return (
        <Box>
            <DataGrid
                sx={{
                    '& .MuiButton-root': {
                        textTransform: 'capitalize'
                    }
                }}
                rows={UserList}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 20, { value: UserList.length > 0 ? UserList.length : 1, label: 'All' }]}
                loading={Loading}
                onCellDoubleClick={handleCellClick}
            />
        </Box>
    )
}

export default OrganizationUsers