import logo from './logo.svg';
import './App.css';
import SignIn from './cmp/SignIn/SignIn';
import SignUp from './cmp/SignUp/SignUp';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import Student_index from './cmp/Student/Student_index'
import Teacher_index from './cmp/Teacher/Teacher_index';
import PrivateRoute from './PrivateRoute'

function App(){
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route  exact path='/signup' component={SignUp}/>
        <PrivateRoute  exact path='/student' component={Student_index} role='student'/>
        <PrivateRoute  exact path='/teacher' component={Teacher_index} role='teacher'/>
        
        <Redirect  to='/' />
      </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
