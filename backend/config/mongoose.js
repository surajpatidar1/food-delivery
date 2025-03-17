import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://surajpatidar498:UUAvGfSQV4vXEiYq@cluster0.k060f.mongodb.net/fooddel')
     .then(()=>{console.log("db connected..");})
}