import userModel from "../models/usermodel.js"

//add items to user cart
const addToCart = async(req,res)=>{
try{ 
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
       cartData[req.body.itemId] = 1;
    }
    else{
        cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{$set:{cartData}});
    res.json({success:true,message:"Added to Cart"});

}catch(err){
    console.log(err);
    res.json({success:false,message:"Error"});

}
}
//remove item from user cart
const removeFromCart = async(req,res)=>{
try{
    let userData = await  userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId),{cartData};
    res.json({success:true,message:"Removed from Cart"});

}catch(err){
    console.log(err);
    res.json({success:false,message:"Error"});

}
}
//fetch user cart data
const getCart = async(req,res)=>{
try{
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData});

}catch(err){
    console.log(err);
    res.json({success:false,message:"Error"});

}
}

export {addToCart,removeFromCart,getCart}