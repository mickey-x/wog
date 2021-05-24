import React, {useContext, useState} from "react";
import logo from "../Instagrill.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import {firebaseAuth} from '../provider/AuthProvider';
import { auth } from "../firebase/firebase";


const Navbar = () => {
  const {handleSignout} = useContext(firebaseAuth)
  const[username, setUsername] = useState("");

  auth.onAuthStateChanged( (user) => {
    if(user) {
      setUsername(user.displayName);
    }
  }) 


  return (
    <div className="nav-bar">
      <div className="nav-container">

        <div className="nav-logo-and-search">
          <div>
            <Link to="/"><img src={logo} className="app-logo" alt="logo" /></Link>
          </div>
          <div className="search-box">
            <input type="text" className="search" placeholder="Search..." />
          </div>
        </div>

        <div className="menu">
          <Link to="/"><HomeRoundedIcon className="icon-item"/></Link>
          <Link to={`/${username}`}><AccountCircleIcon className="icon-item"/></Link>
          <Link to="#LikedPost"><FavoriteBorderRoundedIcon className="icon-item"/></Link>
          <Link onClick={handleSignout} to="/"><ExitToAppIcon className="icon-item"/></Link>
        </div>

      </div>
    </div>
  )
}

export default Navbar;
