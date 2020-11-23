import {React, useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './Drawer'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      input: {
        display: 'none',
      },
  }));



function Header() {
  const [isopen, setisopen] = useState(false);
  
    const classes=useStyles();

    
    
    return(
<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={()=>setisopen(true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Face-Net-Niet
          </Typography>
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer isopen={isopen} setisopen={setisopen}/>
    </div>


    )
}

export default Header
