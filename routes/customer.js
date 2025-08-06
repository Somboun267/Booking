const express =  require('express')

const router = express.Router()

const {list,update,remove} = require('../controllers/customerController')
const {ProtectRoutes} = require('../middleware/protectRoutes')



/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer management
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get all customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get('/customer',ProtectRoutes,list)

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contact:
 *                 type: string
 *               google:
 *                 type: string
 *               facebook:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.put('/customer/:id',ProtectRoutes,update)

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Delete a customer by ID (and related profile)
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer and profile deleted
 */
router.delete('/customer/:id',ProtectRoutes,remove)



module.exports = router