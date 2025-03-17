import React, { Profiler, useContext, useState } from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext'

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("Home")
  
  const {getTotalCartAmount,token,setToken} = useContext(Storecontext);
  const navigation = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigation("/");
  }
  return (
    <div className='navbar'>
   <Link to='/' ><img src={assets.logo} alt="" className="logo" /></Link> 
    <ul className="navbar-menu">
      <Link to={'/'} onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
      <a href='#explore-menu' onClick={()=>setMenu("Menu")}className={menu==="Menu"?"active":""}>Menu</a>
      <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a>
      <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}> Contact Us</a>
    </ul>
    <div className="navbar-right">
      <img src={assets.search_icon} alt="" />
      <div className="navbar-serach-icon">
        <Link to='/cart'>< img src={assets.basket_icon} alt="" /></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
      :<div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigation('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
      </div>
         }
      
    </div>
    </div>
  )
}

export default Navbar
