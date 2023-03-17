import React, {useState} from 'react';
import { Grid } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import BaseLayout from "../BaseLayout";

function ResourceExchange() {

    const [searchKeyword, setSearchKeyword] = useState([]);

    const ListSearchInput = (e) => {
        e.persist();
        setSearchKeyword(e.target.value);
    }

    const stringSearch = () => {
        console.log('Clicked');
    }

    return (
        <BaseLayout title={"Projects"}>
            <div>
                <Grid container style={{ marginTop: '2em', paddingLeft:'3.5em', paddingRight: '3.5em', marginBottom:'1em' }} >
                    <Grid item xs={12} md={7} style={{ paddingRight:'3em', marginBottom:'3em' }}>
                        <h1>Resource Exchange</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud.
                        </p>
                        <Grid container spacing={2} className="search_bar">
                            <Grid item sm={12} md={12}>
                                <TextField
                                    type='text'
                                    name="list_search"
                                    size="small"
                                    placeholder="What are you looking for?"
                                    onChange={ListSearchInput}
                                    value={searchKeyword}
                                >
                                </TextField>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    type={"button"}
                                    className="theme-btn ligth-btn small-btn"
                                    onClick={stringSearch}
                                    style={{float: 'right'}}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <div style={{marginTop:'7em'}}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <a href='resource-exchange/resource-sharing'>Resource Sharing</a>
                                <a href='resource-exchange/jobs'>Jobs</a>
                                <a href='resource-exchange/grants-and-proposals'>Grants and Proposals</a>
                                <a href='resource-exchange/suppliers'>Suppliers</a>
                            </Grid>
                        </div> */}
                    </Grid>
                    <Grid item xs={12} md={5} style={{backgroundColor:'grey'}}>
                    </Grid>
                </Grid>
            </div>
        </BaseLayout>
    );
}

export default ResourceExchange;
