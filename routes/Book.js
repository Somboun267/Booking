const express = require('express')
const router = express.Router()

const { createBook, list, update,deleteBook } = require('../controllers/BookController')

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Booking management
 */

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get all bookings
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/book', list)

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new booking
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               roomId:
 *                 type: integer
 *               roomName:
 *                 type: string
 *               mettingDate:
 *                 type: string
 *                 format: date
 *               mettingTime:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               equipments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking created
 */
router.post('/book', createBook)

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Book]
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
 *               customerId:
 *                 type: integer
 *               roomId:
 *                 type: integer
 *               roomName:
 *                 type: string
 *               mettingDate:
 *                 type: string
 *                 format: date
 *               mettingTime:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               equipments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated
 */
router.put('/book/:id', update)


router.delete('/book/:id',deleteBook)




module.exports = router