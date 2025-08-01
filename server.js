const express = require('express')
const app = express()

app.get("/api",(req,res)=>{
    res.send("helloooooo")
})

app.listen(3000,()=>{
    console.log("server is runnig port 300")
})