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

function TagsLevel4() {

    const [state, setState] = useState({
        level1: '',
        level2: '',
        level3: '',
    })

    const handleChangeLevel1 = (event) => {
        setState({
            ...state,
            level1: event.target.value
        })
    };

    const handleChangeLevel2 = (event) => {
        setState({
            ...state,
            level2: event.target.value
        })
    };

    const handleChangeLevel3 = (event) => {
        setState({
            ...state,
            level3: event.target.value
        })
    };


    return (
        <Box>

            <Grid container sx={{mb: 2}}>

                <Grid item>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level1}
                            onChange={handleChangeLevel1}
                        >
                            <MenuItem value={'level 1'}>Level 1 tags</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level2}
                            onChange={handleChangeLevel2}
                        >
                            <MenuItem value={'level 2'}>Level 2 tags</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level3}
                            onChange={handleChangeLevel3}
                        >
                            <MenuItem value={'level 3'}>Level 3 tags</MenuItem>
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

export default TagsLevel4;