import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {FaShoppingCart } from "react-icons/fa";
import {auth, fs} from "../Firebase/Config";
import { useHistory } from "react-router-dom";

import {
    Badge,
    Button,
    Container,
    Dropdown,
    FormControl,
    Nav,
    Navbar,
  } from "react-bootstrap";

export const Header = () => {



    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FirstName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
     console.log(user);
    
     const history = useHistory();

     const handleLogout=()=>{
         auth.signOut().then(()=>{
             history.push('/login');
         })
     }
     

    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-2">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <img src="images/logo.jpg"  width="50" height="50" alt="placeholder"/>
                        <span className="fs-1">Eco Friendly Bags</span>
                    </Link>
                    <ul className="nav nav-pills">
                     {!user&& <> 
                        <li className="nav-item">
                           <Link to="/login" className="nav-link text-dark">Login</Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/singup" className="nav-link text-dark">Sign up</Link>
                        </li>
                        <li className="nav-item">
                           <Link className='navlink' to="/cart">
                              <Icon icon={shoppingCart} size={30}/>
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/checkout" className="nav-link text-dark">Check Out</Link>
                        </li>
                        </>}
                        {user&&<> 
                            <li className="nav-item">
                           <Link to="/" className="nav-link text-dark">{user}</Link>
                        </li>
                        <li className="nav-item">
                           <Link className='navlink' to="/cart">
                              <Icon icon={shoppingCart} size={30}/>
                           </Link>
                           <br></br>
                        </li>
                        <li className="btn btn-danger btn-md" style={{maxHeight:38}} onClick={handleLogout}>LOGOUT
                           
                        </li>
                        
                        </>}
                    </ul>
                </header>
                </div>   
                <div className="container">
                {/* <!-- Navbar -->*/}
                <nav className="navbar navbar-collapse navbar-expand-lg">
                      <div className="container-fluid collapse navbar-collapse" id="navbarExample01" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                          <li className="nav-item"> <Link to="/" className="nav-link text-white fs-3 active" aria-current="page">Home</Link></li>
                          <li className="nav-item"> <Link to="/customprint" className="nav-link text-white fs-3">CustomPrinting</Link></li>
                          <li className="nav-item"> <Link to="/aboutus" className="nav-link text-white fs-3">About Us</Link></li>
                          <li className="nav-item"> <Link to="/contact" className="nav-link text-white fs-3">Contact Us</Link></li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- Navbar -->*/}
                </div>
        </div>
    )
}

export default Header