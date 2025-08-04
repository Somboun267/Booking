const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
exports.list = async (req, res) => {

    try {
        const customer = await prisma.customer.findMany({})
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error list " })
    }
}



exports.update = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
  
      const { contact, google, facebook } = req.body
  
      const newCustomer = await prisma.customer.update({
        where: {
             id 
            },
        data: { 
            contact, 
            
            google, 
            facebook 
        } 
      })
  
      delete newCustomer.password
      res.status(200).json({message:"update",newCustomer})
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "error update" })
    }
  }

exports.remove = async (req, res) => {
    try {

        res.send("hello remove")
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error remove " })
    }
}


