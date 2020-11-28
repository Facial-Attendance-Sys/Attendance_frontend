import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core'
import { AddOutlined, CheckBoxOutlined, ExitToAppOutlined, HomeOutlined, PersonPinCircleOutlined } from '@material-ui/icons';
import React from 'react'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Drawer(props) {

  return (
    <div>
      <SwipeableDrawer
        anchor={'left'}
        open={props.isopen}
        onClose={() => props.setisopen(false)}
        onOpen={() => props.setisopen(true)}
      >
        <Items />
      </SwipeableDrawer>
    </div>
  )
}


function Items() {
  const history = useHistory()
  const classes = useStyles()
  const logout = () => {

    // console.log('logout clicked');
    localStorage.removeItem('token');
    history.push('/')

  }
  return (
    <div
      className={classes.list}
      role="presentation"

    >
      <List>
        <ListItem button key={1} >
          <ListItemIcon> <HomeOutlined /> </ListItemIcon>

          <ListItemText primary={'Dashboard'} onClick={() => history.push('/teacher')} />
        </ListItem>

        <ListItem button key={2} >
          <ListItemIcon> <PersonPinCircleOutlined /> </ListItemIcon>
          <ListItemText primary={'Mark Attendance'} onClick={() => history.push('/teacher/attendance')} />
        </ListItem>

        <ListItem button key={3} >
          <ListItemIcon><CheckBoxOutlined /> </ListItemIcon>
          <ListItemText primary={'Update Attendance'} onClick={() => history.push('/')} />
        </ListItem>

        <ListItem button key={4} >
          <ListItemIcon><ExitToAppOutlined />  </ListItemIcon>
          <ListItemText primary={'Logout'} onClick={logout} />
        </ListItem>

      </List>

    </div>




  )

}
export default Drawer
