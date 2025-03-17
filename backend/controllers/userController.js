import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config.js'


//login user
const loginUser = async(req,res)=>{
const {email,password} = req.body;
try{
    const user = await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User is doen't exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false,message:"Please enter valid password"})
    }

    const token = createToken(user._id)
    res.json({success:true,token});
}catch(err){
console.log(err);
res.json({success:false,message:"Error"})

}
}

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req,res)=>{

    //checking user already exixts
    const {name,password,email} = req.body;
    try{
         const exists = await userModel.findOne({email});
         if(exists){
            return res.json({success:false,message:"User already exists"});
         }
         //validating email and strong password
         if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please under a valid email"})
         }

         //password validation

         if(password.length<8){
            return res.json({success:false,message:"Please enter strong password "})
         }

         //hasing userpassword
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

         const newUser = new userModel({
            name:name,
            password:hashedPassword,
            email:email
         });
        const user =  await newUser.save();;
        const token = createToken(user._id);
       res.json({success:true,token})

    }catch(err){
console.log(err);
res.json({success:false,message:'This is Error'})
    }

}
export {loginUser,registerUser}