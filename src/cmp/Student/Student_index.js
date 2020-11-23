import {React, useState}from 'react'

import Header from './Header'

import { Grid } from '@material-ui/core'
function Student_index() {
   

    return (
        <Grid container >
             <Grid item xs={12}>
                 <Header />
                 
             </Grid>
             <Grid item container  xs={12}>
             <Body/>
             </Grid>
        </Grid>
    )

}

function Body()
{
    return (
        <Grid item >
             <h1>Welcome student</h1>
           
        </Grid>
           
            
           
       
    )

}
export default Student_index
