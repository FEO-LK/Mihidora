import React from 'react'
import { Grid, Typography } from "@mui/material";

const UserMenu = () => {
	return (
		<Grid container>
      <Grid item xs={12}>
        <ul className='sub_menu'>
          <li><a href='/admin/users'>All Users</a></li>
          {/* <li><a href='/admin/new-request'><Typography variant='span' className='menuitem_result'>2</Typography> New Request</a></li> */}
        </ul>
      </Grid>
    </Grid>
	)
}

export default UserMenu;