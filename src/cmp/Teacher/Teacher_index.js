import { Grid } from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import {get, Loading} from '../CommonCmp'

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
    const [loading, setloading] = useState(true);
    const [quote, setquote] = useState('')
 useEffect(() => {
     async function fetch_data()
     {
        const res=await get('/quotes');
        if(res && res.status)
        {
          
            setquote(res.quote);
            setloading(false);
        }
     }
         
        fetch_data();
     
     return () => {
         
     }

 }, []);

    if(loading) return <Loading/>;

    return (
        <Grid container s={12} lg={12}>
                <Quotes quote={quote}/>
        </Grid>
    )

}
function Quotes(props)
{
 

return (
    
   <marquee>
       <br/>
       <q> {props.quote.quote}</q> -by <cite>{props.quote.by}</cite>
  
 
 </marquee>
    

)

}
export default Teacher_index
