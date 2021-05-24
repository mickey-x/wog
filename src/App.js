import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import Post from "./component/Post";
import Navbar from './component/Navbar'
import SignInSide from "./component/SignInSide";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import Follow from "./component/Follow";
import PopUp from "./component/PopUp";
import {firebaseAuth} from "./provider/AuthProvider"


function App() {
  const {token} = useContext(firebaseAuth);

  return (
    <Router>
      <Switch>

        <Route exact path="/" 
          render={ rProps => token === null ? 
          <SignInSide /> : 
          [<Navbar />, <PopUp />,<Follow />, <Post />]}
        />
        
        <Route exact path="/signin"
          render={rProps => token === null ? 
          <Redirect to='/' /> : 
          [<Navbar />, <PopUp />, <Post />]}
        />
        
        <Route exact path="/signup" component={SignUp} />

        <Route path={`/:username`} 
          render={() => token === null ? 
          <Redirect to='/' /> : 
          [<Navbar />, <Profile />]}
        />
        
      </Switch>
    </Router>
  );
}

export default App;