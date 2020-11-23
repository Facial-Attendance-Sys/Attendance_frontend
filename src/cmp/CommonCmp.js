import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Redirect,useHistory} from 'react-router-dom';

const useStylesLoading = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
    width:'100vw'

  },
  
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
function AlertMessage(props)
  {
    return (<Snackbar 
        anchorOrigin={{vertical:'top',horizontal: 'right'}} 
        open={props.error} 
        autoHideDuration={4000} 
        
        onClose={()=>props.seterror({is_have:false,type:props.type})} >
         <Alert  
         severity={props.type}
         onClose={()=>props.seterror({is_have:false,type:props.type})}>
          {props.message}
        </Alert>
      </Snackbar>)
    
    
  
  }

  function Loading(props)
  {
    const classes=useStylesLoading()
    return(
      <div className={classes.root}>
      <CircularProgress size={100}/>
    </div>
    )
  }


function Logout()
{
  const history=useHistory()
     
      function logout()
    {
      
      // console.log('logout clicked');
    localStorage.removeItem('token');
    history.push('/')
   
    }
  
  return    <Button
            
            fullWidth
            variant="contained"
            color="primary"
            onClick={logout}
          >
           Logout<Logout/>
          </Button>

}

export default AlertMessage

  export {
Loading,Logout
  }