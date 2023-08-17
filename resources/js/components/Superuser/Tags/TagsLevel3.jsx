import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

function TagsLevel3() {

    const [level1, setLevel1] = useState('');

    const handleChangeLevel1 = (event) => {
        setLevel1(event.target.value);
    };

    const [level2, setLevel2] = useState('');

    const handleChangeLevel2 = (event) => {
        setLevel2(event.target.value);
    };


    return (
        <Box>

            <Grid container sx={{mb: 2}}>

                <Grid item>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={level1}
                            onChange={handleChangeLevel1}
                        >
                            <MenuItem value={'level 1'}>Level 1 tags</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={level2}
                            onChange={handleChangeLevel2}
                        >
                            <MenuItem value={'level 2'}>Level 2 tags</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center" }}>
                    <Button className="update-button">Filter</Button>
                </Grid>
            </Grid>

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

export default TagsLevel3;