import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth, fs} from "../Firebase/Config";
import { useHistory } from "react-router-dom";

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

   // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                    console.log("From header for quantity",qty);
                })
            }
        })       
    },[])  
     

    return (
        <div>
            <div className="container navbar">
                
                   <div className="leftside">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <img src="images/logo.jpg"  width="50" height="50" alt="placeholder"/>
                        <span className="fs-1">Eco Friendly Bags</span>
                    </Link>
                    </div>
                    <div className="rightside">
                     {!user&& <> 
                        <div>
                           <Link to="/login" className="nav-link text-dark">Login</Link>
                        </div>
                        <div>
                           <Link className='cart-menu-btn' to="/cart">
                              <Icon icon={shoppingCart} size={35}/>
                           </Link>
                        </div>
                        <div>
                           <Link to="/singup" className="nav-link text-dark">Sign up</Link>
                        </div>
                        </>}
                        {user&&<> 
                         <div>
                           <Link className="nav-link" to="/" >{user}</Link>
                        </div>
                        <div>
                           <Link className="cart-menu-btn" to="/cart">
                              <Icon icon={shoppingCart} size={35}/>
                           </Link>
                           <Link className="btn btn-danger btn-md" to="/cart">{totalProducts}</Link>
                        </div>
                        <div className="btn btn-danger btn-md" style={{maxHeight:38}} onClick={handleLogout}>LOGOUT
                           
                        </div>
                        
                        </>}
                    </div>
          
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