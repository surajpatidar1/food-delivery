import { createContext,  useEffect,  useState } from "react";
import axios from 'axios'

export const Storecontext = createContext(null)

const StorecontextProvider = (props)=>{
    const[cartItems,setcartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token,setToken] = useState("")
    const[food_list,setsFoodList] = useState([])

    const addToCard = async(itemId)=>{
        console.log(cartItems)
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/card/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId-1]}))
        if(token){
            await axios.post(url+"/api/food/remove",{itemId},{headers:{token}})
        }
    } 

  const getTotalCartAmount = ()=>{
    let totalAmount =0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id===item)
            totalAmount += itemInfo.price* cartItems[item];
        }
    }
    return totalAmount;
  }
  const fetchFoodList = async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    setsFoodList(response.data.data)
}
const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setcartItems(response.data.cartData)
}
  useEffect(()=>{
   
    async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"))
        }
    }
    loadData();
  },[])
    
    const contextValue = {
        food_list,
            setcartItems,
            cartItems,
            addToCard,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
            
    }
    return(
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}
export default StorecontextProvider;