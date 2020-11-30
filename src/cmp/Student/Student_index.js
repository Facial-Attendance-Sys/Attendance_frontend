import {React, useEffect, useState}from 'react'

import Header from './Header'
import {Loading,get} from '../CommonCmp'
import { Grid, Typography } from '@material-ui/core'

function Student_index(){
    
   

    return (
        <Grid container >
             <Grid item xs={12}>
                 <Header />
             </Grid>
             
              <Body/>
             
             
        </Grid>
    )

}

function Body(props)
{   const [loading, setloading] = useState(true);
    const [quote, setquote] = useState('')
    

 useEffect(() => {

     async function fetch_data()
     {
         const res=await get('/quotes');
         if(res)
         {
            if(res.status)
            {
                setquote(res.quote);
                
                setloading(false);
            }
         }
        
        

     }

     fetch_data();
     
     return () => {
         
     }

 }, []);

    if(loading) return <Loading/>;

    return (
        
        <Grid container s={12} lg={12}>

            
              <Quotes data={quote}/>
        </Grid>
    )

}

function Quotes(props)
{
 

return (
    
   <marquee>
       <br/>
       <q> {props.data.quote}</q> -by <cite>{props.data.by}</cite>
   </marquee>
    

)

}
export default Student_index
