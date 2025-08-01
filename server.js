const express = require('express')
const app = express()
const auth = require('./routes/auth')

app.use('/api',auth)

app.get("/api",(req,res)=>{
    res.send("helloooooo")
})

app.listen(3000,()=>{
    console.log("server is runnig port 300")
})