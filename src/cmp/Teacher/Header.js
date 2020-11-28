import {React, useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './Drawer'
import api from '../API_URL'
import { useHistory } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { Menu, MenuItem } from '@material-ui/core';
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
  const [anchorE1, setanchorE1] = useState(null);
  const [name, setname] = useState('')

    const classes=useStyles();
    const history=useHistory();

    const logout=async()=>
    {
      fetch(api+'/user/logout',{method:'post',headers: { 'Content-type': 'application/json' }, body: JSON.stringify({token:localStorage.token}) })
      // console.log('logout clicked');
    localStorage.removeItem('token');
    history.push('/')
   
    }

  useEffect(() => {
    async function fetch_data()
    {
      const res=await fetch(api+'/getdetails',{ method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({token:localStorage.token})})
      .then(res=>res.json());
      setname(res.name)
    }
    fetch_data()
    return () => {
      
    }
  }, [])

  const handleClose=()=>{
    setanchorE1(null)

  }
  const handleMenu=(e)=>{
    setanchorE1(e.currentTarget)
  }
    
    
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
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorE1}
                
                keepMounted
                
                open={Boolean(anchorE1)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{name}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer isopen={isopen} setisopen={setisopen}/>
    </div>


    )
}

export default Header
