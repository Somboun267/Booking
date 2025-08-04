const express = require('express')
const app = express()
const bodyparser = require('body-parser')

// import routes
const auth = require('./routes/auth')
const customer = require('./routes/customer')

// 
app.use(bodyparser.json())

// ern sai routes
app.use('/api',auth)
app.use('/api',customer)



app.listen(3000,()=>{
    console.log("server is runnig port 300")
})