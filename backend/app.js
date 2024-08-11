const express = require('express');
const app = express();
const bannerRouter = require("./Router/bannerRouter")
const dashboardRouter = require("./Router/dashboardRouter")
const path = require('path');
const cors = require('cors')
//cors proxy
app.use(cors({
    origin:"*"
}))

//body and url parser 
app.use(express.json({limit:'1mb'}))
app.use(express.urlencoded({limit:'1mb',extended:true}))


// register router
app.use("/banner",bannerRouter);
app.use("/dashboard",dashboardRouter);

app.get("/test",async(req,res)=>{
    res.status(200).json({success:true,message:"Health test passed!!!"})
})

app.use(express.static(path.join(__dirname,'../client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})






module.exports = app;