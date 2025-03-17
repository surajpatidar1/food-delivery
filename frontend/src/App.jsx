import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Placeorder from './pages/Placeorder/Placeorder'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import Verify from './pages/verify/verify'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'

function App() {
  const [showLogin,setShowLogin] = useState(false)
      return(
        <>
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
         <div className='app'>
          <Navbar setShowLogin={setShowLogin}/>
          <Routes>
<Route path='/' element={<Home/>} />
<Route path='/cart' element={<Card/>} />
<Route path='/order' element={<Placeorder/>} />
<Route path='/verify' element={<Verify/>} />
<Route path='/myorders' element={<MyOrders/>} />
          </Routes>
        </div>
        <Footer/>
        </>
       
      )
}

export default App
