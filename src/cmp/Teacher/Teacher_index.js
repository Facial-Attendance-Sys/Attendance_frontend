import { Grid } from '@material-ui/core'
import { React, useState } from 'react'


import Header from './Header'
function Teacher_index() {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Header />

            </Grid>
            <Grid item container xs={12}>
                <Body />
            </Grid>
        </Grid>
    )
}

function Body() {
    return (
        <Grid item >
            <h1>Welcome Teacher</h1>

        </Grid>
    )

}
export default Teacher_index
