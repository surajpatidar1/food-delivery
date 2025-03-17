import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { connectDB } from "./config/mongoose.js"
import foodRouter from "./routes/routeFood.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
 const app = express()
 const port = 4000

 //middleware
 app.use(express.json())
 app.use(cors())

 //mongoose
 connectDB();

 //api endpoint
 app.use("/api/food",foodRouter);
 app.use("/images",express.static("uploads"))
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
 app.use("/api/order",orderRouter)

 app.get("/",(req,res)=>{
    res.send("hello");
 })
 
 app.listen(port,()=>{
    console.log(`port ${port} is listening...`)
 })