import React, { useContext } from 'react'
import './Card.css'
import{Storecontext} from '../../context/Storecontext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Card = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount ,url } = useContext(Storecontext)

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
              </div>
              <hr />
              </div>
              
            )
          }

        })}
      </div>
      <div className="card-bottom">
      <div className="card-total">
        <h2 >Cart Totals</h2>
        <div>
          <div className="card-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="card-total-details">
            <p>Deliveryfee</p>
            <p>{getTotalCartAmount()===0?0:2}</p>
          </div>
          <div className="card-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="card-promocode">
        <div >
        <p>If you have a promo code ,enter it here</p>
        <div className='card-promocode-input'>
        <input type="text" placeholder='promo code' />
        <button>Submit</button>
        </div>
        </div>
        
      </div>
      </div>
      
    </div>
  )
}

export default Card
