const express = require('express')

const router = express.Router()

const {list,createRoom,UpdateRoom,remove} = require('../controllers/roomController')


/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room management
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/rooms",list)

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *               roomName:
 *                 type: string
 *               floor:
 *                 type: string
 *               type_room:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active_status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Room created
 */
router.post("/room",createRoom)

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Room]
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
 *               images:
 *                 type: string
 *               roomName:
 *                 type: string
 *               floor:
 *                 type: string
 *               type_room:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active_status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Room updated
 */
router.put("/room/:id",UpdateRoom)


/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room deleted
 */
router.delete("/room/:id",remove)



module.exports = router