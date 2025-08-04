const express =  require('express')

const router = express.Router()

const {list,createCustomer,update,remove} = require('../controllers/customerController')

router.get('/customer',list)


router.put('/customer/:id',update)
router.delete('/customer/:id',remove)



module.exports = router