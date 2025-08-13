const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')

// import routes
const auth = require('./routes/auth')
const customer = require('./routes/customer')
const room = require('./routes/room')
const book = require('./routes/Book')
const favorite = require('./routes/favorite')

// import swagger
const swagger = require('./swagger');

// 
app.use(bodyparser.json())
// images Room
app.use('/images', express.static(path.join(__dirname, 'images')))
// Images Profile
app.use('/Profileimages', express.static(path.join(__dirname, 'Profileimages')));
// ern sai routes
app.use('/api',auth)
app.use('/api',customer)
app.use('/api',room)
app.use('/api',book)
app.use('/api',favorite)


swagger(app);





app.listen(3000,()=>{
    console.log("server is runnig port 300")
})